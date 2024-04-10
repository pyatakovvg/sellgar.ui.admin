import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Route } from './Route';
import { Router } from './Router';

import { Error } from './components/Error';
import { Splash } from './components/Splash';
import { NotPage } from './components/NotPage';

import { ApplicationController } from './application/application.controller';

import { Provider } from './application.context.ts';

interface IApplicationOption {
  basename?: string;
  routes: (Router | Route)[];
}

export class Application {
  constructor(private readonly options: IApplicationOption) {}

  private readonly _controller = new ApplicationController();

  createView() {
    const routes = createBrowserRouter(
      [
        {
          path: '/',
          loader: async () => {
            if (!this._controller.initialized) {
              return await this._controller.checkProfile();
            }
            return true;
          },
          element: <Splash />,
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
        <ErrorBoundary FallbackComponent={Error}>
          <Provider
            value={{
              appController: this._controller,
            }}
          >
            <RouterProvider router={routes} fallbackElement={<Splash />} />
          </Provider>
        </ErrorBoundary>
      );
    };
  }
}
