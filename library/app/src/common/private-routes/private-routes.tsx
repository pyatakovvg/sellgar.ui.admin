import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { contextProvider } from '../context';
import { ApplicationContext, ApplicationControllerInterface } from '../application';
import { PrivateRoutesInterface, type IOptions } from './private-routes.interface.tsx';

export class PrivateRoutes implements PrivateRoutesInterface {
  constructor(private readonly options: IOptions) {}

  create(): ReactRouter.RouteObject {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
    const components = applicationContext.options.components;
    const inFlightBySignal = new WeakMap<AbortSignal, Promise<void>>();
    const completedBySignal = new WeakSet<AbortSignal>();

    const runPrivateGuards = async (args?: ReactRouter.LoaderFunctionArgs) => {
      const controller = applicationContext.container.getContainer().get(ApplicationControllerInterface);
      const signal = args?.request.signal;

      if (!signal) {
        await applicationContext.guardRunner.run('private', applicationContext.guards, controller);
        return;
      }

      if (completedBySignal.has(signal)) {
        return;
      }

      const pending = inFlightBySignal.get(signal);
      if (pending) {
        await pending;
        return;
      }

      const execution = applicationContext.guardRunner
        .run('private', applicationContext.guards, controller)
        .then(() => {
          completedBySignal.add(signal);
        })
        .finally(() => {
          inFlightBySignal.delete(signal);
        });

      inFlightBySignal.set(signal, execution);
      await execution;
    };

    const wrapWithGuard = (route: ReactRouter.RouteObject): ReactRouter.RouteObject => {
      const wrapped: ReactRouter.RouteObject = { ...route };

      if (wrapped.loader) {
        const originalLoader = wrapped.loader;
        wrapped.loader = async (args) => {
          await runPrivateGuards(args);
          return originalLoader(args);
        };
      }

      if (wrapped.lazy) {
        const originalLazy = wrapped.lazy;
        wrapped.lazy = async () => {
          const lazyResult = await originalLazy();
          if (!lazyResult || !lazyResult.loader) {
            return lazyResult;
          }

          const originalLoader = lazyResult.loader;
          return {
            ...lazyResult,
            loader: async (args: ReactRouter.LoaderFunctionArgs) => {
              await runPrivateGuards(args);
              return originalLoader(args);
            },
          };
        };
      }

      if (wrapped.children) {
        wrapped.children = wrapped.children.map((child) => wrapWithGuard(child));
      }

      return wrapped;
    };

    return {
      loader: async (args) => {
        await runPrivateGuards(args);
      },
      errorElement: components?.exception ?? null,
      element: this.options.layout?.(<ReactRouter.Outlet />) ?? <ReactRouter.Outlet />,
      children: [
        ...this.options.routes.map((route) => wrapWithGuard(route.create())),
        {
          path: '*',
          element: components?.notFound ?? null,
        },
      ],
    };
  }
}
