import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { ApplicationRouterRuntimeEntry } from '../../../../core/application/lifecycle/application';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { ApplicationComponents } from '../../../application/config/application-configurator';
import type { ModuleMetadata } from '../../../module/declaration/module';
import { getRoutePresentationDefinition } from '../../declaration/route';
import { RouteModuleHost } from '../route-host';
import { RoutePathHost } from '../router-host';
import { ScreenTransition } from '../screen-transition';
import {
  createNativeRouteProjection,
  type NativePendingRouteProjection,
  type NativeRouteProjectionNode,
} from './native-route-projection.ts';
import { resolveNativeScreenOrder } from './native-screen-order.ts';

interface NativeRouteProjectionHostProps {
  readonly backInProgress: boolean;
  readonly components: ApplicationComponents;
  readonly entries: readonly ApplicationRouterRuntimeEntry<ModuleMetadata>[];
  readonly forward: boolean;
  readonly pending: NativePendingRouteProjection | null;
}

export const NativeRouteProjectionHost: React.FC<NativeRouteProjectionHostProps> = (props) => {
  const nodes = React.useMemo(() => createNativeRouteProjection(props.entries), [props.entries]);
  const focusedEntryKey = props.entries.find((entry) => entry.phase === 'focused')?.key;

  return (
    <NativeRouteOutletHost
      backInProgress={props.backInProgress}
      components={props.components}
      depth={0}
      forward={props.forward}
      nodes={nodes}
      pending={props.pending}
      selectedEntryKey={focusedEntryKey}
      transitionsEnabled
    />
  );
};

interface NativeRouteNodeHostProps extends NativeRouteProjectionContext {
  readonly node: NativeRouteProjectionNode;
}

const NativeRouteNodeHost: React.FC<NativeRouteNodeHostProps> = (props) => {
  const pending = props.pending?.routes[props.depth] === props.node.runtime ? props.pending : null;

  return (
    <RoutePathHost
      components={props.components}
      outlet={(components) => (
        <NativeRouteOutletHost
          {...props}
          components={components}
          depth={props.depth + 1}
          nodes={props.node.children}
          ownerRuntime={props.node.runtime}
          pending={pending}
          terminalEntryKeys={props.node.terminalEntryKeys}
        />
      )}
      presentation="screen"
      routes={[props.node.runtime]}
    />
  );
};

interface NativeRouteProjectionContext {
  readonly backInProgress: boolean;
  readonly components: ApplicationComponents;
  readonly depth: number;
  readonly forward: boolean;
  readonly pending: NativePendingRouteProjection | null;
  readonly selectedEntryKey: string | undefined;
  readonly transitionsEnabled: boolean;
}

interface NativeRouteOutletHostProps extends NativeRouteProjectionContext {
  readonly nodes: readonly NativeRouteProjectionNode[];
  readonly ownerRuntime?: RouteActivationRuntime<ModuleMetadata>;
  readonly terminalEntryKeys?: readonly string[];
}

type NativeRouteOutletItem =
  | {
      readonly entryKeys: readonly string[];
      readonly id: string;
      readonly kind: 'module';
      readonly runtime: RouteActivationRuntime<ModuleMetadata>;
    }
  | {
      readonly entryKeys: readonly string[];
      readonly id: string;
      readonly kind: 'route';
      readonly node: NativeRouteProjectionNode;
    };

const NativeRouteOutletHost: React.FC<NativeRouteOutletHostProps> = (props) => {
  const items = createOutletItems(props.ownerRuntime, props.terminalEntryKeys, props.nodes);
  const itemEntryKeys = React.useRef(new Map<string, string>());
  const selectedItem = resolveSelectedItem(items, props.selectedEntryKey);
  const selectedItemId = useRetainedSelectedItem(items, selectedItem?.id);
  const order = React.useRef<readonly string[]>([]);

  order.current = resolveNativeScreenOrder(
    order.current,
    items.map((item) => item.id),
    selectedItemId,
  );

  if (items.length === 0 && !isPendingAtOutlet(props.pending, props.depth)) return null;

  return (
    <View style={styles.outlet}>
      {items.map((item) => {
        const focused = item.id === selectedItemId;
        const entryKey = resolveItemEntryKey(itemEntryKeys.current, item, props.selectedEntryKey);
        const animation =
          item.kind === 'route' && props.transitionsEnabled
            ? getRoutePresentationDefinition(item.node.runtime.route).animation
            : undefined;

        return (
          <ScreenTransition
            accessibilityElementsHidden={!focused}
            animation={animation}
            backInProgress={props.backInProgress}
            focused={focused}
            forward={props.forward}
            importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
            key={item.id}
            order={order.current.indexOf(item.id)}
            pointerEvents={focused ? 'auto' : 'none'}
            topOrder={items.length}
          >
            {item.kind === 'module' ? (
              <RouteModuleHost components={props.components} presentation="screen" runtime={item.runtime} />
            ) : (
              <NativeRouteNodeHost
                {...props}
                node={item.node}
                selectedEntryKey={entryKey}
                transitionsEnabled={props.transitionsEnabled && focused}
              />
            )}
          </ScreenTransition>
        );
      })}

      {isPendingAtOutlet(props.pending, props.depth) ? (
        <View pointerEvents="auto" style={[StyleSheet.absoluteFill, styles.pending]}>
          {props.components.fallback ?? null}
        </View>
      ) : null}
    </View>
  );
};

const createOutletItems = (
  ownerRuntime: RouteActivationRuntime<ModuleMetadata> | undefined,
  terminalEntryKeys: readonly string[] | undefined,
  nodes: readonly NativeRouteProjectionNode[],
): readonly NativeRouteOutletItem[] => {
  const items: NativeRouteOutletItem[] = [];

  if (ownerRuntime && terminalEntryKeys && terminalEntryKeys.length > 0) {
    items.push({
      entryKeys: terminalEntryKeys,
      id: `${getRouteRuntimeKey(ownerRuntime)}:module`,
      kind: 'module',
      runtime: ownerRuntime,
    });
  }

  for (const node of nodes) {
    items.push({
      entryKeys: node.entryKeys,
      id: `${getRouteRuntimeKey(node.runtime)}:route`,
      kind: 'route',
      node,
    });
  }

  return items;
};

const resolveSelectedItem = (
  items: readonly NativeRouteOutletItem[],
  selectedEntryKey: string | undefined,
): NativeRouteOutletItem | undefined => {
  if (!selectedEntryKey) return undefined;
  return items.find((item) => item.entryKeys.includes(selectedEntryKey));
};

const useRetainedSelectedItem = (
  items: readonly NativeRouteOutletItem[],
  selectedItemId: string | undefined,
): string | null => {
  const selected = React.useRef<string | null>(null);
  const available = new Set(items.map((item) => item.id));

  if (selectedItemId) {
    selected.current = selectedItemId;
  } else if (selected.current === null || !available.has(selected.current)) {
    selected.current = items.at(-1)?.id ?? null;
  }

  return selected.current;
};

const resolveItemEntryKey = (
  selections: Map<string, string>,
  item: NativeRouteOutletItem,
  selectedEntryKey: string | undefined,
): string => {
  if (selectedEntryKey && item.entryKeys.includes(selectedEntryKey)) {
    selections.set(item.id, selectedEntryKey);
    return selectedEntryKey;
  }

  const retained = selections.get(item.id);

  if (retained && item.entryKeys.includes(retained)) return retained;

  const entryKey = item.entryKeys.at(-1);

  if (!entryKey) throw new Error('Native route presentation не связана ни с одной core activation.');

  selections.set(item.id, entryKey);
  return entryKey;
};

const isPendingAtOutlet = (pending: NativePendingRouteProjection | null, depth: number): boolean => {
  return pending?.commonRouteCount === depth;
};

const routeRuntimeKeys = new WeakMap<RouteActivationRuntime<ModuleMetadata>, string>();
let routeRuntimeKey = 0;

const getRouteRuntimeKey = (runtime: RouteActivationRuntime<ModuleMetadata>): string => {
  const current = routeRuntimeKeys.get(runtime);

  if (current) return current;

  const key = `native-route-presentation-${++routeRuntimeKey}`;

  routeRuntimeKeys.set(runtime, key);
  return key;
};

const styles = StyleSheet.create({
  outlet: {
    flex: 1,
  },
  pending: {
    zIndex: 1,
  },
});
