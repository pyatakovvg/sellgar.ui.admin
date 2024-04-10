import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Route } from './Route';
import { Router } from './Router.tsx';
import { PublicRouter } from './PublicRouter.tsx';
import { PrivateRouter } from './PrivateRouter.tsx';

import { NotPage } from './components/NotPage';
import { Splash } from './components/Splash';

import { Provider } from './application.context.ts';
import { container } from './application/application.di.ts';
import { ApplicationController, ApplicationControllerSymbol } from './application/controller/application.controller.ts';

interface IApplicationOption {
  basename?: string;
  routes: (Router | Route | PublicRouter | PrivateRouter)[];
}

export class Application {
  private readonly controller = container.get<ApplicationController>(ApplicationControllerSymbol);

  constructor(private readonly options: IApplicationOption) {}

  createView() {
    const routes = createBrowserRouter(
      [
        {
          id: 'root',
          path: '/',
          loader: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return true;
          },
          children: this.options.routes.map((route) => route.create()),
        },
        {
          path: '*',
          element: <NotPage />,
        },
      ],
      {
        basename: this.options.basename ?? '/',
      },
    );

    return () => {
      return (
        <Provider
          value={{
            controller: this.controller,
          }}
        >
          <RouterProvider router={routes} fallbackElement={<Splash />} />
        </Provider>
      );
    };
  }
}
