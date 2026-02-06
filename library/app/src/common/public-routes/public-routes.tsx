import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { contextProvider } from '../context';
import { ApplicationContext, ApplicationControllerInterface } from '../application';

import { PublicRoutesInterface, type IOptions } from './public-routes.interface.ts';

export class PublicRoutes implements PublicRoutesInterface {
  constructor(private readonly options: IOptions) {}

  create(): ReactRouter.RouteObject {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);

    return {
      lazy: async () => ({
        loader: async () => {
          const controller = applicationContext.container.getContainer().get(ApplicationControllerInterface);

          await applicationContext.guardRunner.runOnce(
            'public',
            applicationContext.guards,
            controller,
          );
        },
      }),
      errorElement: applicationContext.options.components!.exception,
      element: this.options.layout?.(<ReactRouter.Outlet />) ?? <ReactRouter.Outlet />,
      children: [
        ...this.options.routes.map((route) => route.create()),
        {
          path: '*',
          element: applicationContext.options.components!.notFound,
        },
      ],
    };
  }
}
