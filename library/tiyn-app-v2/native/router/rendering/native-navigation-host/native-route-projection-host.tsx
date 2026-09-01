import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ApplicationRouterHistoryEntry } from '../../../../core/application/lifecycle/application';
import { getRouteDefinition } from '../../../../core/router/declaration/route';
import type { NavigationRouteEntry, NavigationState } from '../../../../core/router/runtime/navigation-state';
import type { RouterRuntimeActivationTree } from '../../../../core/router/runtime/router-runtime';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { ApplicationComponents } from '../../../application/config/application-configurator';
import { renderLayouts } from '../../../layout/rendering/layout-renderer';
import type { ModuleMetadata } from '../../../module/declaration/module';
import { ScreenAnimation } from '../../../screen/declaration/screen-animation';
import type { ScreenPresentation } from '../../../screen/declaration/screen-presentation';
import { ScreenRenderer } from '../../../screen/rendering/screen-renderer';
import { getRoutePresentationDefinition } from '../../declaration/route';
import {
  type NativePendingRouteProjection,
  resolveNativePendingRouteProjection,
  resolveNativeRouteIndexPresentationKey,
  resolveNativeRoutePresentationKey,
} from './native-route-projection.ts';

interface NativeRouteProjectionHostProps {
  readonly components: ApplicationComponents;
  readonly current: NavigationState | undefined;
  readonly entries: readonly ApplicationRouterHistoryEntry<ModuleMetadata>[];
  readonly pending: NavigationState | null;
}

export const NativeRouteProjectionHost: React.FC<NativeRouteProjectionHostProps> = (props) => {
  const focusedEntry = props.entries.at(-1) ?? null;
  const current = focusedEntry?.activation.navigation ?? props.current;
  const currentPath = current?.root.path ?? EMPTY_PATH;
  const pending = resolveNativePendingRouteProjection(current, props.pending);
  const focusedTree = focusedEntry?.tree ?? null;
  const previousPath = React.useRef(currentPath);
  const leavingPath = pending ? currentPath : previousPath.current;

  React.useLayoutEffect(() => {
    previousPath.current = currentPath;
  }, [currentPath]);

  if (focusedTree === null && pending === null) {
    return props.components.fallback ?? null;
  }

  return (
    <NativeRouteOutletHost
      components={props.components}
      currentPath={currentPath}
      depth={0}
      leavingPath={leavingPath}
      pending={pending}
      tree={focusedTree}
    />
  );
};

interface NativeRouteOwner {
  readonly entry: NavigationRouteEntry;
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
}

interface NativeRouteOutletHostProps {
  readonly components: ApplicationComponents;
  readonly currentPath: readonly NavigationRouteEntry[];
  readonly depth: number;
  readonly leavingPath: readonly NavigationRouteEntry[];
  readonly owner?: NativeRouteOwner;
  readonly pending: NativePendingRouteProjection | null;
  readonly tree: RouterRuntimeActivationTree<ModuleMetadata> | null;
}

const NativeRouteOutletHost: React.FC<NativeRouteOutletHostProps> = (props) => {
  const pendingAtOutlet = props.pending?.changeDepth === props.depth ? props.pending : null;
  const target = pendingAtOutlet
    ? createPendingTarget(props.components, pendingAtOutlet, props.depth, props.owner)
    : createCommittedTarget(props);
  const previousKey = React.useRef<string | null>(null);
  const animation =
    target && target.presentation.key !== previousKey.current
      ? resolveTargetAnimation(target.route, props.leavingPath, props.depth)
      : undefined;
  const presentation = target ? Object.freeze({ ...target.presentation, animation }) : null;

  React.useLayoutEffect(() => {
    previousKey.current = target?.presentation.key ?? null;
  }, [target?.presentation.key]);

  return (
    <View style={styles.outlet}>
      <ScreenRenderer presentation={presentation} />
    </View>
  );
};

interface NativeScreenTarget {
  readonly presentation: ScreenPresentation;
  readonly route: NavigationRouteEntry['route'] | null;
}

const createCommittedTarget = (props: NativeRouteOutletHostProps): NativeScreenTarget | null => {
  const entry = props.currentPath[props.depth] ?? null;
  const tree = props.tree;
  const runtime = tree?.routes[props.depth] ?? null;

  if (entry && runtime && tree) {
    if (entry.route !== runtime.route) {
      throw new Error('Core navigation path и focused runtime tree содержат разные Route.');
    }

    return Object.freeze({
      presentation: Object.freeze({
        animation: undefined,
        content: (
          <NativeRouteScreen
            components={props.components}
            currentPath={props.currentPath}
            depth={props.depth}
            entry={entry}
            leavingPath={props.leavingPath}
            pending={props.pending}
            runtime={runtime}
            tree={tree}
          />
        ),
        key: resolveNativeRoutePresentationKey(entry, props.depth),
      }),
      route: entry.route,
    });
  }

  if (!entry && !runtime && props.owner) {
    return Object.freeze({
      presentation: Object.freeze({
        animation: undefined,
        content: (
          <NativeRoutePlaceholder
            entry={props.owner.entry}
            identity={resolveNativeRouteIndexPresentationKey(props.owner.entry, props.depth)}
            runtime={props.owner.runtime}
          />
        ),
        key: resolveNativeRouteIndexPresentationKey(props.owner.entry, props.depth),
      }),
      route: null,
    });
  }

  if (!entry && !runtime) return null;

  throw new Error('Core navigation path и focused runtime tree имеют разную глубину.');
};

interface NativeRouteScreenProps {
  readonly components: ApplicationComponents;
  readonly currentPath: readonly NavigationRouteEntry[];
  readonly depth: number;
  readonly entry: NavigationRouteEntry;
  readonly leavingPath: readonly NavigationRouteEntry[];
  readonly pending: NativePendingRouteProjection | null;
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
  readonly tree: RouterRuntimeActivationTree<ModuleMetadata>;
}

const NativeRouteScreen: React.FC<NativeRouteScreenProps> = (props) => {
  const route = getRouteDefinition(props.runtime.route);
  const definition = getRoutePresentationDefinition(props.runtime.route);
  const components = inheritRouteComponents(props.components, definition);
  const content =
    route.routes.length > 0 ? (
      <NativeRouteOutletHost
        components={components}
        currentPath={props.currentPath}
        depth={props.depth + 1}
        leavingPath={props.leavingPath}
        owner={{ entry: props.entry, runtime: props.runtime }}
        pending={props.pending}
        tree={props.tree}
      />
    ) : (
      <NativeRoutePlaceholder
        entry={props.entry}
        identity={resolveNativeRoutePresentationKey(props.entry, props.depth)}
        runtime={props.runtime}
      />
    );

  return <>{renderLayouts(definition.layouts, content)}</>;
};

const createPendingTarget = (
  components: ApplicationComponents,
  pending: NativePendingRouteProjection,
  depth: number,
  owner?: NativeRouteOwner,
): NativeScreenTarget => {
  const entry = pending.path[depth];

  if (!entry) {
    if (!owner) {
      throw new Error('Pending index screen не имеет Route owner.');
    }

    const key = resolveNativeRouteIndexPresentationKey(owner.entry, depth);

    return Object.freeze({
      presentation: Object.freeze({
        animation: undefined,
        content: <NativeRoutePlaceholder entry={owner.entry} identity={key} runtime={owner.runtime} />,
        key,
      }),
      route: null,
    });
  }

  const definition = getRoutePresentationDefinition(entry.route);

  return Object.freeze({
    presentation: Object.freeze({
      animation: definition.animation,
      content: <NativePendingRouteScreen components={components} depth={depth} pending={pending} />,
      key: resolveNativeRoutePresentationKey(entry, depth),
    }),
    route: entry.route,
  });
};

const NativePendingRouteScreen: React.FC<{
  readonly components: ApplicationComponents;
  readonly depth: number;
  readonly pending: NativePendingRouteProjection;
}> = (props) => {
  const entry = props.pending.path[props.depth];

  if (!entry) return props.components.fallback ?? null;

  const definition = getRoutePresentationDefinition(entry.route);
  const components = inheritRouteComponents(props.components, definition);
  const child = props.pending.path[props.depth + 1]
    ? createPendingTarget(components, props.pending, props.depth + 1).presentation
    : null;
  const content = child ? (
    <View style={styles.outlet}>
      <ScreenRenderer presentation={child} />
    </View>
  ) : (
    (components.fallback ?? null)
  );

  return <>{renderLayouts(definition.layouts, content)}</>;
};

const inheritRouteComponents = (
  components: ApplicationComponents,
  definition: ReturnType<typeof getRoutePresentationDefinition>,
): ApplicationComponents => {
  return Object.freeze({
    ...components,
    exception: definition.exception ?? components.exception,
    fallback: definition.fallback ?? components.fallback,
    forbidden: definition.forbidden ?? components.forbidden,
    notFound: definition.notFound ?? components.notFound,
  });
};

const resolveTargetAnimation = (
  target: NavigationRouteEntry['route'] | null,
  leavingPath: readonly NavigationRouteEntry[],
  depth: number,
): ScreenAnimation | undefined => {
  const entering = target ? getRoutePresentationDefinition(target).animation : undefined;

  if (entering) return entering;

  for (let index = leavingPath.length - 1; index >= depth; index -= 1) {
    const leaving = getRoutePresentationDefinition(leavingPath[index]!.route).animation;
    const reversed = reverseScreenAnimation(leaving);

    if (reversed) return reversed;
  }

  return undefined;
};

const reverseScreenAnimation = (animation: ScreenAnimation | undefined): ScreenAnimation | undefined => {
  switch (animation) {
    case ScreenAnimation.Fade:
      return ScreenAnimation.Fade;
    case ScreenAnimation.SlideFromLeft:
      return ScreenAnimation.SlideFromRight;
    case ScreenAnimation.SlideFromRight:
      return ScreenAnimation.SlideFromLeft;
    default:
      return undefined;
  }
};

const NativeRoutePlaceholder: React.FC<{
  readonly entry: NavigationRouteEntry;
  readonly identity: string;
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
}> = ({ entry, identity, runtime }) => {
  const route = getRouteDefinition(runtime.route);
  const title = resolveRouteTitle(route.token);

  return (
    <View accessibilityLabel={`Native screen ${title}`} style={styles.placeholder}>
      <Text style={styles.eyebrow}>ROUTER → SCREEN</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{JSON.stringify(entry.params)}</Text>
      <Text style={styles.identity}>{identity}</Text>
    </View>
  );
};

const resolveRouteTitle = (token: ReturnType<typeof getRouteDefinition>['token']): string => {
  if (typeof token === 'function' && token.name) return token.name;
  return 'AnonymousRoute';
};

const EMPTY_PATH: readonly NavigationRouteEntry[] = Object.freeze([]);

const styles = StyleSheet.create({
  details: {
    color: '#a9afbf',
    fontSize: 14,
    marginTop: 12,
  },
  eyebrow: {
    color: '#7f75ff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  identity: {
    color: '#62697a',
    fontSize: 11,
    marginTop: 18,
  },
  outlet: {
    flex: 1,
  },
  placeholder: {
    backgroundColor: '#0f1117',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  title: {
    color: '#f4f5f8',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
});
