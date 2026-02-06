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

    return {
      loader: async () => {
        const controller = applicationContext.container.getContainer().get(ApplicationControllerInterface);

        await applicationContext.guardRunner.runOnce(
          'private',
          applicationContext.guards,
          controller,
        );
      },
      errorElement: components?.exception ?? null,
      element: this.options.layout?.(<ReactRouter.Outlet />) ?? <ReactRouter.Outlet />,
      children: [
        ...this.options.routes.map((route) => route.create()),
        {
          path: '*',
          element: components?.notFound ?? null,
        },
      ],
    };
  }
}
