import { LngProvider } from '@library/lng';
import { PushProvider } from '@library/push';
import { BreadcrumbsProvider } from '@library/breadcrumbs';
import { Message, MessageProvider } from '@library/message';

import 'reflect-metadata';

import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider, Outlet } from 'react-router-dom';

import { Route } from './route.tsx';
import { Router } from './router.tsx';
import { PublicRouter } from './public-router.tsx';
import { PrivateRouter } from './private-router.tsx';
import { ApplicationProvider } from './application.provider.tsx';

import { Error } from './components/error';
import { NotFound } from './components/not-found';

import { Splash } from './components/splash';

interface IApplicationOption {
  basename?: string;
  routes: (Router | Route | PublicRouter | PrivateRouter)[];
}

const Content: React.FC = () => {
  return (
    <ApplicationProvider>
      <PushProvider>
        <MessageProvider>
          <BreadcrumbsProvider>
            <Message />
            <Outlet />
          </BreadcrumbsProvider>
        </MessageProvider>
      </PushProvider>
    </ApplicationProvider>
  );
};

export class Application {
  constructor(private readonly options: IApplicationOption) {}

  createView() {
    const routes = createBrowserRouter(
      [
        {
          id: 'root',
          element: <Content />,
          errorElement: <Error />,
          hydrateFallbackElement: <Splash />,
          children: this.options.routes.map((route) => route.create()).filter((route) => route) as RouteObject[],
        },
        {
          path: '*',
          errorElement: <Error />,
          element: <NotFound />,
        },
      ],
      {
        window: window,
        future: {},
        basename: this.options.basename ?? '/',
      },
    );

    return () => {
      return (
        <LngProvider>
          <RouterProvider router={routes} />
        </LngProvider>
      );
    };
  }
}
