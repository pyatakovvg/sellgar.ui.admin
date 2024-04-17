import 'reflect-metadata';

import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { Route } from './Route';
import { Router } from './Router.tsx';
import { PublicRouter } from './PublicRouter.tsx';
import { PrivateRouter } from './PrivateRouter.tsx';

import { NotPage } from './components/NotPage';
import { Splash } from './components/Splash';

import { container } from './classes/classes.di.ts';
import { Provider } from './application.context.ts';

import { ProfilePresenter, ProfilePresenterSymbol } from './classes/presenter/profile.presenter.ts';
import { ApplicationPresenter, ApplicationPresenterSymbol } from './classes/presenter/application.presenter.ts';

interface IApplicationOption {
  basename?: string;
  routes: (Router | Route | PublicRouter | PrivateRouter)[];
}

export class Application {
  constructor(private readonly options: IApplicationOption) {}

  createView() {
    const routes = createBrowserRouter(
      [
        {
          id: 'root',
          path: '/',
          loader: async () => {
            await new Promise((resolve) => setTimeout(resolve, 400));
            return true;
          },
          children: this.options.routes.map((route) => route.create()).filter((route) => route) as RouteObject[],
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
            profile: container.get<ProfilePresenter>(ProfilePresenterSymbol),
            presenter: container.get<ApplicationPresenter>(ApplicationPresenterSymbol),
          }}
        >
          <RouterProvider router={routes} fallbackElement={<Splash />} />
        </Provider>
      );
    };
  }
}
