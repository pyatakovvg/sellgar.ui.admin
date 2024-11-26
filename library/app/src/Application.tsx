import { LngProvider } from '@library/lng';
import { PushProvider } from '@library/push';
import { BreadcrumbsProvider } from '@library/breadcrumbs';
import { Message, MessageProvider } from '@library/message';

import 'reflect-metadata';

import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { Route } from './Route';
import { Router } from './Router.tsx';
import { PublicRouter } from './PublicRouter.tsx';
import { PrivateRouter } from './PrivateRouter.tsx';

import { Splash } from './components/Splash';
import { NotPage } from './components/NotPage';

import { ApplicationProvider } from './ApplicationProvider.tsx';

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
          loader: async () => {
            await new Promise((resolve) => setTimeout(resolve, Number(import.meta.env.VITE_SPLASH_TIMEOUT) * 1000));
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
        window: window,
        future: {
          v7_fetcherPersist: true,
          v7_relativeSplatPath: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true,
        },
        basename: this.options.basename ?? '/',
      },
    );

    return () => {
      return (
        <LngProvider>
          <ApplicationProvider>
            <PushProvider>
              <MessageProvider>
                <BreadcrumbsProvider>
                  <Message />
                  <RouterProvider router={routes} fallbackElement={<Splash />} />
                </BreadcrumbsProvider>
              </MessageProvider>
            </PushProvider>
          </ApplicationProvider>
        </LngProvider>
      );
    };
  }
}
