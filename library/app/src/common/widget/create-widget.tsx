import React from 'react';
import { Container, ContainerModule, ServiceIdentifier } from 'inversify';

import { useContainer, Await, WidgetRevalidateServiceInterface } from '../application';

import { WidgetControllersContext } from './widget-controllers.context.ts';
import { WidgetLoaderDataProvider } from './widget-loader-data.provider.tsx';

interface WidgetFactoryOptions {
  containerModule?: ContainerModule;
  controller?: ServiceIdentifier[];
  view: React.ReactElement;
  fallback?: React.ReactNode;
  error?: React.ReactNode;
}

const moduleRefCount = new WeakMap<ContainerModule, number>();

const retainModule = (container: Container, module: ContainerModule) => {
  const current = moduleRefCount.get(module) ?? 0;

  if (current === 0) {
    container.loadSync(module);
  }
  moduleRefCount.set(module, current + 1);
};

const releaseModule = (container: Container, module: ContainerModule) => {
  const current = moduleRefCount.get(module) ?? 0;

  if (current <= 1) {
    moduleRefCount.delete(module);
    container.unloadSync(module);
    return;
  }
  moduleRefCount.set(module, current - 1);
};

export function createWidget(options: WidgetFactoryOptions) {
  return function Widget() {
    const container = useContainer();
    const [isReady, setIsReady] = React.useState(false);
    const controllersRef = React.useRef<Map<ServiceIdentifier, unknown> | null>(null);
    const pendingPromiseRef = React.useRef<Promise<void> | null>(null);
    const [reloadToken, setReloadToken] = React.useState(0);
    const revalidateService = container.get(WidgetRevalidateServiceInterface);

    if (!pendingPromiseRef.current) {
      pendingPromiseRef.current = new Promise<void>(() => {});
    }

    React.useLayoutEffect(() => {
      let isMounted = true;
      const handler = () => setReloadToken((value) => value + 1);

      if (options.containerModule) {
        retainModule(container, options.containerModule);
      }

      const controllerIds = options.controller ?? [];
      const controllers = new Map<ServiceIdentifier, unknown>();
      for (const controllerId of controllerIds) {
        controllers.set(controllerId, container.get(controllerId));
      }

      if (isMounted) {
        controllersRef.current = controllers;
        setIsReady(true);
      }

      const keys = options.controller ?? [];
      keys.forEach((key) => revalidateService.register(key, handler));

      return () => {
        isMounted = false;
        controllersRef.current = null;
        const removeKeys = options.controller ?? [];
        removeKeys.forEach((key) => revalidateService.unregister(key, handler));
        if (options.containerModule) {
          releaseModule(container, options.containerModule);
        }
      };
    }, [container, options.containerModule, options.controller, revalidateService]);

    const loaderPromise = React.useMemo(() => {
      if (!isReady) {
        return pendingPromiseRef.current;
      }

      const loaderPromises =
        options.controller?.map((controllerId) => {
          const controller = controllersRef.current?.get(controllerId);
          const loader = (controller as { loader?: () => Promise<unknown> } | undefined)?.loader?.bind(controller);
          return loader ? loader() : undefined;
        }) ?? [];

      return Promise.all(loaderPromises);
    }, [isReady, options.controller, reloadToken]);

    return (
      <WidgetControllersContext.Provider value={controllersRef.current}>
        <Await error={options.error} fallback={options.fallback} loader={loaderPromise}>
          <WidgetLoaderDataProvider>{options.view}</WidgetLoaderDataProvider>
        </Await>
      </WidgetControllersContext.Provider>
    );
  };
}
