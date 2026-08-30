import React from 'react';
import { BackHandler, StyleSheet, ToastAndroid, View } from 'react-native';

import type {
  ApplicationNavigationDecision,
  ApplicationRouterRuntimeEntry,
} from '../../../../core/application/lifecycle/application';
import type { RouterRuntime } from '../../../../core/router/runtime/router-runtime';
import type {
  ApplicationComponents,
  ResolvedApplicationRouting,
} from '../../../application/config/application-configurator';
import type { ModuleMetadata } from '../../../module/declaration/module';
import type { NativeNavigationDriver, NativeRouterBridge } from '../../bridge/native-router-bridge';
import { NestedRouterLayer } from '../nested-router-layer';
import { RouterHost } from '../router-host';
import { resolveRootBack } from './native-root-back';

interface NativeNavigationHostProps {
  readonly bridge: NativeRouterBridge;
  readonly components: ApplicationComponents;
  readonly decision: ApplicationNavigationDecision | null;
  readonly routing: ResolvedApplicationRouting | null;
  readonly runtime: RouterRuntime<ModuleMetadata>;
  readonly runtimeEntries: readonly ApplicationRouterRuntimeEntry<ModuleMetadata>[];
}

export const NativeNavigationHost: React.FC<NativeNavigationHostProps> = (props) => {
  const rootBackPressedAt = React.useRef<number | null>(null);
  const focusedEntry = props.runtimeEntries.find((entry) => entry.phase === 'focused') ?? null;
  React.useSyncExternalStore(
    React.useCallback((listener) => props.runtime.subscribe(listener), [props.runtime]),
    React.useCallback(() => props.runtime.getSnapshot(), [props.runtime]),
    React.useCallback(() => props.runtime.getSnapshot(), [props.runtime]),
  );
  const pending = props.runtime.getBranchSnapshot().pending;

  React.useEffect(() => {
    rootBackPressedAt.current = null;
  }, [focusedEntry?.key]);

  React.useEffect(() => {
    const driver: NativeNavigationDriver = {
      rootBack: () => {
        const resolution = resolveRootBack(rootBackPressedAt.current, Date.now());

        rootBackPressedAt.current = resolution.pressedAt;

        if (resolution.exit) {
          BackHandler.exitApp();
        } else {
          ToastAndroid.show('Нажмите «Назад» ещё раз, чтобы свернуть приложение', ToastAndroid.SHORT);
        }
      },
    };

    return props.bridge.registerDriver(driver);
  }, [props.bridge]);

  React.useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      void props.bridge.back();
      return true;
    });

    return () => subscription.remove();
  }, [props.bridge]);

  return (
    <View style={styles.root}>
      {props.runtimeEntries.map((entry) => {
        const focused = entry.phase === 'focused';

        return (
          <View
            accessibilityElementsHidden={!focused}
            importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
            key={entry.key}
            pointerEvents={focused ? 'auto' : 'none'}
            style={[styles.activation, !focused && styles.retained]}
          >
            <RouterHost
              components={props.components}
              decision={focused ? props.decision : null}
              presentation="screen"
              runtime={entry.runtime}
              tree={entry.tree}
            />
            <NestedRouterLayer
              components={props.components}
              decision={focused ? props.decision : null}
              routing={props.routing}
              runtime={entry.runtime}
              tree={entry.tree}
            />
          </View>
        );
      })}

      {pending ? (
        <View pointerEvents="auto" style={[styles.activation, styles.preparing]}>
          <RouterHost components={props.components} presentation="screen" runtime={props.runtime} />
          <NestedRouterLayer components={props.components} routing={props.routing} runtime={props.runtime} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  activation: {
    ...StyleSheet.absoluteFillObject,
  },
  preparing: {
    zIndex: 1,
  },
  retained: {
    display: 'none',
  },
  root: {
    flex: 1,
  },
});
