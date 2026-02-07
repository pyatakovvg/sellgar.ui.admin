import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { contextProvider } from '../context';
import {
  ApplicationContext,
  ApplicationControllerInterface,
  NavigateServiceInterface,
  RevalidateServiceInterface,
} from '../application';
import { PublicRoutesInterface } from '../public-routes';
import { PrivateRoutesInterface } from '../private-routes';

import { RouterInterface, type IOptions } from './router.interface.tsx';

export class Router implements RouterInterface {
  constructor(private readonly options: IOptions) {}

  private createRoutes() {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
    const components = applicationContext.options.components;

    const router = ReactRouter.createBrowserRouter(
      [
        {
          lazy: async () => ({
            loader: async () => {
              const controller = applicationContext.container.getContainer().get(ApplicationControllerInterface);

              await applicationContext.guardRunner.runOnce('router', applicationContext.guards, controller);
            },
          }),
          hydrateFallbackElement: components?.splash ?? null,
          errorElement: components?.exception ?? null,
          element: this.options.layout?.(<ReactRouter.Outlet />) ?? <ReactRouter.Outlet />,
          children: this.options.routes.map((route: PublicRoutesInterface | PrivateRoutesInterface) => route.create()),
        },
      ],
      {
        basename: this.options.baseUrl?.replace(/\/$/, ''),
      },
    );
    const container = applicationContext.container.getContainer();
    const navigateService = container.get(NavigateServiceInterface);
    const revalidateService = container.get(RevalidateServiceInterface);
    navigateService.setRouter(router);
    revalidateService.setRouter(router);

    return router;
  }

  render(): React.FC {
    const routes = this.createRoutes();

    return () => <ReactRouter.RouterProvider router={routes} />;
  }
}
