import React from 'react';
import { BackHandler, ToastAndroid } from 'react-native';

import type {
  ApplicationNavigationDecision,
  ApplicationRouterRuntimeEntry,
} from '../../../../core/application/lifecycle/application';
import type { RouterRuntime } from '../../../../core/router/runtime/router-runtime';
import type { ApplicationComponents } from '../../../application/config/application-configurator';
import type { ModuleMetadata } from '../../../module/declaration/module';
import type { NativeNavigationDriver, NativeRouterBridge } from '../../bridge/native-router-bridge';
import { RouterPresentationHost } from '../router-host';
import { NativeRouteProjectionHost } from './native-route-projection-host.tsx';
import { resolveNativePendingRouteProjection } from './native-route-projection.ts';
import { resolveRootBack } from './native-root-back';

interface NativeNavigationHostProps {
  readonly bridge: NativeRouterBridge;
  readonly components: ApplicationComponents;
  readonly decision: ApplicationNavigationDecision | null;
  readonly getRuntimeEntries: () => readonly ApplicationRouterRuntimeEntry<ModuleMetadata>[];
  readonly runtime: RouterRuntime<ModuleMetadata>;
}

export const NativeNavigationHost: React.FC<NativeNavigationHostProps> = (props) => {
  const rootBackPressedAt = React.useRef<number | null>(null);
  const transport = React.useSyncExternalStore(
    props.bridge.subscribe,
    props.bridge.getSnapshot,
    props.bridge.getSnapshot,
  );
  React.useSyncExternalStore(
    React.useCallback((listener) => props.runtime.subscribe(listener), [props.runtime]),
    React.useCallback(() => props.runtime.getSnapshot(), [props.runtime]),
    React.useCallback(() => props.runtime.getSnapshot(), [props.runtime]),
  );
  const runtimeEntries = props.getRuntimeEntries();
  const focusedEntry = runtimeEntries.find((entry) => entry.phase === 'focused') ?? null;
  const branch = props.runtime.getBranchSnapshot();
  const pending = resolveNativePendingRouteProjection(branch);

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
    <RouterPresentationHost components={props.components} decision={props.decision} runtime={props.runtime}>
      {({ components }) =>
        runtimeEntries.length > 0 || pending ? (
          <NativeRouteProjectionHost
            backInProgress={transport.backInProgress}
            components={components}
            entries={runtimeEntries}
            forward={transport.action === 'push'}
            pending={pending}
          />
        ) : (
          (components.fallback ?? null)
        )
      }
    </RouterPresentationHost>
  );
};
