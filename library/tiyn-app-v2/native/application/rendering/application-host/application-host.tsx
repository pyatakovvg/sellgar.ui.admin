import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import type {
  ApplicationLifecycleListener,
  ApplicationLifecycleSnapshot,
} from '../../../../core/application/lifecycle/application-lifecycle';
import type { ApplicationFeatureInterface } from '../../../../core/application/feature/application-feature';
import type {
  ApplicationNavigationListener,
  ApplicationNavigationSnapshot,
  ApplicationRouterRuntimeEntry,
} from '../../../../core/application/lifecycle/application';
import type { RouterRuntime } from '../../../../core/router/runtime/router-runtime';
import type { RuntimeScope } from '../../../../core/runtime/scope/base/runtime-scope';
import { renderApplicationFeatures } from '../../feature/application-feature-renderer';
import type { ApplicationComponents } from '../../config/application-configurator';
import { renderLayouts } from '../../../layout/rendering/layout-renderer';
import type { LayoutConstructor } from '../../../layout/declaration/layout';
import type { ModuleMetadata } from '../../../module/declaration/module';
import type { NativeRouterBridge } from '../../../router/bridge/native-router-bridge';
import { NativeNavigationHost } from '../../../router/rendering/native-navigation-host';
import { NavigationStateProvider } from '../../../router/runtime/navigation-state-context';
import { ExceptionProvider } from '../../../runtime/exception/exception-context';
import { RuntimeErrorBoundary } from '../../../runtime/exception/runtime-error-boundary';
import { RuntimeScopeProvider } from '../../../runtime/scope/runtime-scope-context';
import type { ResolvedApplicationRouting } from '../../config/application-configurator';
import { ApplicationComponentsProvider } from '../application-components-context';
import { PresentationLayer } from '../presentation-layer';

export interface ApplicationViewSource {
  readonly components: ApplicationComponents;
  readonly failRender: (error: unknown) => void | Promise<void>;
  readonly features: readonly ApplicationFeatureInterface[];
  readonly getLifecycle: () => ApplicationLifecycleSnapshot;
  readonly getNavigation: () => ApplicationNavigationSnapshot;
  readonly getRouterRuntime: () => RouterRuntime<ModuleMetadata>;
  readonly getRouterRuntimeEntries: () => readonly ApplicationRouterRuntimeEntry<ModuleMetadata>[];
  readonly layouts: readonly LayoutConstructor[];
  readonly routing: ResolvedApplicationRouting | null;
  readonly routerBridge: NativeRouterBridge;
  readonly scope: RuntimeScope;
  readonly subscribeLifecycle: (listener: ApplicationLifecycleListener) => () => void;
  readonly subscribeNavigation: (listener: ApplicationNavigationListener) => () => void;
}

interface IProps {
  readonly source: ApplicationViewSource;
}

export const ApplicationHost: React.FC<IProps> = (props) => {
  const lifecycle = React.useSyncExternalStore(
    props.source.subscribeLifecycle,
    props.source.getLifecycle,
    props.source.getLifecycle,
  );
  const navigation = React.useSyncExternalStore(
    props.source.subscribeNavigation,
    props.source.getNavigation,
    props.source.getNavigation,
  );

  if (lifecycle.phase === 'disposing' || lifecycle.phase === 'disposed') return null;

  let content: React.ReactNode;
  let applicationFeatures: React.ReactNode = null;
  let modalFeatures: React.ReactNode = null;
  let notificationFeatures: React.ReactNode = null;

  if (lifecycle.phase === 'failed') {
    content = (
      <ExceptionProvider error={lifecycle.error}>
        {props.source.components.failed ?? props.source.components.exception ?? null}
      </ExceptionProvider>
    );
  } else if (lifecycle.phase !== 'ready') {
    content = props.source.components.splash ?? null;
  } else {
    content = navigation.navigation
      ? renderLayouts(
          props.source.layouts,
          <NativeNavigationHost
            bridge={props.source.routerBridge}
            components={props.source.components}
            decision={navigation.decision}
            routing={props.source.routing}
            runtime={props.source.getRouterRuntime()}
            runtimeEntries={props.source.getRouterRuntimeEntries()}
          />,
        )
      : (props.source.components.fallback ?? null);
    applicationFeatures = renderApplicationFeatures(props.source.features, PresentationLayer.Application);
    modalFeatures = renderApplicationFeatures(props.source.features, PresentationLayer.Modal);
    notificationFeatures = renderApplicationFeatures(props.source.features, PresentationLayer.Notification);
  }

  return (
    <RuntimeScopeProvider scope={props.source.scope}>
      <NavigationStateProvider snapshot={navigation}>
        <ApplicationComponentsProvider components={props.source.components}>
          <RuntimeErrorBoundary
            exception={props.source.components.failed ?? props.source.components.exception}
            onError={(error) => void props.source.failRender(error)}
            resetKeys={[props.source]}
          >
            <GestureHandlerRootView style={styles.root}>
              <SafeAreaProvider>
                <SafeAreaView style={styles.root}>
                  {content}
                  {applicationFeatures}
                  {modalFeatures}
                  {notificationFeatures}
                </SafeAreaView>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </RuntimeErrorBoundary>
        </ApplicationComponentsProvider>
      </NavigationStateProvider>
    </RuntimeScopeProvider>
  );
};

export const createApplicationView = (source: ApplicationViewSource): React.FC => {
  return Object.assign(ApplicationHost.bind(null, { source }), { displayName: 'ApplicationView' });
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
