import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ApplicationRouterHistoryEntry } from '../../../../core/application/lifecycle/application';
import type { RouteDeclaration } from '../../../../core/router/declaration/route';
import { getRouteDefinition } from '../../../../core/router/declaration/route';
import type { NavigationState } from '../../../../core/router/runtime/navigation-state';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { ApplicationComponents } from '../../../application/config/application-configurator';
import { renderLayouts } from '../../../layout/rendering/layout-renderer';
import type { ModuleMetadata } from '../../../module/declaration/module';
import type { ScreenPresentation } from '../../../screen/declaration/screen-presentation';
import { ScreenRenderer } from '../../../screen/rendering/screen-renderer';
import { getRoutePresentationDefinition } from '../../declaration/route';
import {
  groupNativeRouteHistory,
  type NativePendingRouteProjection,
  resolveNativePendingRouteProjection,
  resolveNativeRoutePresentationKey,
} from './native-route-projection.ts';

interface NativeRouteProjectionHostProps {
  readonly components: ApplicationComponents;
  readonly current: NavigationState | undefined;
  readonly entries: readonly ApplicationRouterHistoryEntry<ModuleMetadata>[];
  readonly pending: NavigationState | null;
}

export const NativeRouteProjectionHost: React.FC<NativeRouteProjectionHostProps> = (props) => {
  const pending = resolveNativePendingRouteProjection(props.current, props.pending);

  if (props.entries.length === 0 && pending === null) {
    return props.components.fallback ?? null;
  }

  return <NativeRouteOutletHost components={props.components} depth={0} entries={props.entries} pending={pending} />;
};

interface NativeRouteOutletHostProps {
  readonly components: ApplicationComponents;
  readonly depth: number;
  readonly entries: readonly ApplicationRouterHistoryEntry<ModuleMetadata>[];
  readonly ownerRuntime?: RouteActivationRuntime<ModuleMetadata>;
  readonly pending: NativePendingRouteProjection | null;
}

const NativeRouteOutletHost: React.FC<NativeRouteOutletHostProps> = (props) => {
  const groups = groupNativeRouteHistory(props.entries, props.depth);
  const pendingAtOutlet = props.pending?.changeDepth === props.depth ? props.pending : null;
  const pendingRoute = pendingAtOutlet?.path[props.depth]?.route ?? null;
  const pendingKey = pendingAtOutlet ? resolveNativeRoutePresentationKey(pendingRoute, props.depth) : null;
  const screens: ScreenPresentation[] = groups.flatMap((group) => {
    if (group.id === pendingKey) return [];

    if (group.runtime === null) {
      if (!props.ownerRuntime) {
        throw new Error('Root native outlet не может содержать index presentation без Route owner.');
      }

      return [
        Object.freeze({
          animation: undefined,
          content: <NativeRoutePlaceholder id={group.id} runtime={props.ownerRuntime} />,
          key: group.id,
        }),
      ];
    }

    const presentation = getRoutePresentationDefinition(group.runtime.route);
    const pending = props.pending?.path[props.depth]?.route === group.runtime.route ? props.pending : null;

    return [
      Object.freeze({
        animation: presentation.animation,
        content: (
          <NativeRouteScreen
            components={props.components}
            depth={props.depth + 1}
            entries={group.entries}
            id={group.id}
            pending={pending}
            runtime={group.runtime}
          />
        ),
        key: group.id,
      }),
    ];
  });

  if (pendingAtOutlet) {
    screens.push(createPendingScreen(props.components, pendingAtOutlet, props.depth));
  }

  return (
    <View style={styles.outlet}>
      <ScreenRenderer screens={screens} />
    </View>
  );
};

interface NativeRouteScreenProps {
  readonly components: ApplicationComponents;
  readonly depth: number;
  readonly entries: readonly ApplicationRouterHistoryEntry<ModuleMetadata>[];
  readonly id: string;
  readonly pending: NativePendingRouteProjection | null;
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
}

const NativeRouteScreen: React.FC<NativeRouteScreenProps> = (props) => {
  const route = getRouteDefinition(props.runtime.route);
  const presentation = getRoutePresentationDefinition(props.runtime.route);
  const content =
    route.routes.length > 0 ? (
      <NativeRouteOutletHost
        components={props.components}
        depth={props.depth}
        entries={props.entries}
        ownerRuntime={props.runtime}
        pending={props.pending}
      />
    ) : (
      <NativeRoutePlaceholder id={props.id} runtime={props.runtime} />
    );

  return <>{renderLayouts(presentation.layouts, content)}</>;
};

const createPendingScreen = (
  components: ApplicationComponents,
  pending: NativePendingRouteProjection,
  depth: number,
): ScreenPresentation => {
  const route = pending.path[depth]?.route ?? null;
  const key = resolveNativeRoutePresentationKey(route, depth);

  if (route === null) {
    return Object.freeze({
      animation: undefined,
      content: components.fallback ?? null,
      key,
    });
  }

  const presentation = getRoutePresentationDefinition(route);

  return Object.freeze({
    animation: presentation.animation,
    content: <NativePendingRouteScreen components={components} depth={depth + 1} pending={pending} route={route} />,
    key,
  });
};

const NativePendingRouteScreen: React.FC<{
  readonly components: ApplicationComponents;
  readonly depth: number;
  readonly pending: NativePendingRouteProjection;
  readonly route: RouteDeclaration;
}> = (props) => {
  const route = getRouteDefinition(props.route);
  const content =
    route.routes.length > 0 ? (
      <View style={styles.outlet}>
        <ScreenRenderer screens={[createPendingScreen(props.components, props.pending, props.depth)]} />
      </View>
    ) : (
      (props.components.fallback ?? null)
    );

  return <>{renderLayouts(getRoutePresentationDefinition(props.route).layouts, content)}</>;
};

const NativeRoutePlaceholder: React.FC<{
  readonly id: string;
  readonly runtime: RouteActivationRuntime<ModuleMetadata>;
}> = ({ id, runtime }) => {
  const route = getRouteDefinition(runtime.route);
  const title = resolveRouteTitle(route.token);
  const params = runtime.getParams();

  return (
    <View accessibilityLabel={`Native screen ${title}`} style={styles.placeholder}>
      <Text style={styles.eyebrow}>ROUTER MECHANICS</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.details}>{JSON.stringify(params)}</Text>
      <Text style={styles.identity}>{id}</Text>
    </View>
  );
};

const resolveRouteTitle = (token: ReturnType<typeof getRouteDefinition>['token']): string => {
  if (typeof token === 'function' && token.name) return token.name;
  return 'AnonymousRoute';
};

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
