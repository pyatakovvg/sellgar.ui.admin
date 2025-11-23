import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { contextProvider } from '../context';
import { ApplicationContext } from '../application';
import { PublicRoutesInterface } from '../public-routes';
import { PrivateRoutesInterface } from '../private-routes';

import { RouterInterface, type IOptions } from './router.interface.tsx';

export class Router implements RouterInterface {
  constructor(private readonly options: IOptions) {
    console.log('Router: constructor - start');
    console.log('Router: constructor - finish');
  }

  private createRoutes() {
    console.log('Router: createRoutes', this);

    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);

    return ReactRouter.createBrowserRouter(
      [
        {
          hydrateFallbackElement: applicationContext.options.components!.splash,
          errorElement: applicationContext.options.components!.exception,
          element: this.options.layout?.(<ReactRouter.Outlet />) ?? <ReactRouter.Outlet />,
          children: this.options.routes.map((route: PublicRoutesInterface | PrivateRoutesInterface) => route.create()),
        },
      ],
      {
        basename: this.options.baseUrl?.replace(/\/$/, ''),
      },
    );
  }

  render(): React.FC {
    const routes = this.createRoutes();

    return () => <ReactRouter.RouterProvider router={routes} />;
  }
}
