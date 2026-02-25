import React from 'react';
import { Container, ContainerModule, ServiceIdentifier } from 'inversify';

import { useContainer, Await, WidgetRevalidateServiceInterface } from '../application';

import { WidgetControllersContext } from './widget-controllers.context.ts';
import { WidgetLoaderDataProvider } from './widget-loader-data.provider.tsx';
import { Provider as WidgetLoaderDataContextProvider } from './widget-loader-data.context.ts';

interface WidgetFactoryOptions<TProps extends object = Record<string, never>> {
  containerModule?: ContainerModule;
  controller?: ServiceIdentifier[];
  view: React.ReactElement | React.ComponentType<TProps>;
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

export function createWidget<TProps extends object = Record<string, never>>(options: WidgetFactoryOptions<TProps>) {
  return function Widget(props: TProps) {
    const container = useContainer();
    const controllerIds = React.useMemo(() => options.controller ?? [], [options.controller]);
    const hasControllers = controllerIds.length > 0;
    const hasContainerModule = Boolean(options.containerModule);
    const requiresBootstrap = hasControllers || hasContainerModule;
    const [isReady, setIsReady] = React.useState(!requiresBootstrap);
    const controllersRef = React.useRef<Map<ServiceIdentifier, unknown> | null>(null);
    const pendingPromiseRef = React.useRef<Promise<void> | null>(null);
    const [reloadToken, setReloadToken] = React.useState(0);

    if (!pendingPromiseRef.current) {
      pendingPromiseRef.current = new Promise<void>(() => {});
    }

    React.useLayoutEffect(() => {
      if (!requiresBootstrap) {
        return;
      }

      let isMounted = true;
      const handler = () => setReloadToken((value) => value + 1);

      if (hasContainerModule && options.containerModule) {
        retainModule(container, options.containerModule);
      }

      const controllers = new Map<ServiceIdentifier, unknown>();
      for (const controllerId of controllerIds) {
        controllers.set(controllerId, container.get(controllerId));
      }

      const revalidateService = hasControllers ? container.get(WidgetRevalidateServiceInterface) : null;

      if (isMounted) {
        controllersRef.current = controllers;
        setIsReady(true);
      }

      if (revalidateService) {
        controllerIds.forEach((key) => revalidateService.register(key, handler));
      }

      return () => {
        isMounted = false;
        controllersRef.current = null;
        if (revalidateService) {
          controllerIds.forEach((key) => revalidateService.unregister(key, handler));
        }
        if (hasContainerModule && options.containerModule) {
          releaseModule(container, options.containerModule);
        }
      };
    }, [container, controllerIds, hasContainerModule, hasControllers, options.containerModule, requiresBootstrap]);

    const loaderPromise = React.useMemo(() => {
      if (!requiresBootstrap || !hasControllers) {
        return Promise.resolve([]);
      }

      if (!isReady) {
        return pendingPromiseRef.current;
      }

      const loaderPromises = controllerIds.map((controllerId) => {
        const controller = controllersRef.current?.get(controllerId);
        const loader = (controller as { loader?: () => Promise<unknown> } | undefined)?.loader?.bind(controller);
        return loader ? loader() : undefined;
      });

      return Promise.all(loaderPromises);
    }, [controllerIds, hasControllers, isReady, reloadToken, requiresBootstrap]);

    const widgetView = React.isValidElement(options.view) ? options.view : React.createElement(options.view, props);

    if (!requiresBootstrap) {
      return (
        <WidgetControllersContext.Provider value={null}>
          <WidgetLoaderDataContextProvider value={{}}>{widgetView}</WidgetLoaderDataContextProvider>
        </WidgetControllersContext.Provider>
      );
    }

    return (
      <WidgetControllersContext.Provider value={controllersRef.current}>
        <Await error={options.error} fallback={options.fallback} loader={loaderPromise}>
          <WidgetLoaderDataProvider>{widgetView}</WidgetLoaderDataProvider>
        </Await>
      </WidgetControllersContext.Provider>
    );
  };
}
