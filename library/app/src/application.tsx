import 'reflect-metadata';

import { container } from '@library/domain';
import { LngProvider } from '@library/lng';
import { PushProvider } from '@library/push';
import { BreadcrumbsProvider } from '@library/breadcrumbs';
import { Message, MessageProvider } from '@library/message';

import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider, Outlet } from 'react-router-dom';

import { Route } from './route.tsx';
import { Router } from './router.tsx';
import { PublicRouter } from './public-router.tsx';
import { PrivateRouter } from './private-router.tsx';
import { ApplicationProvider } from './application.provider.tsx';

import { Error } from './components/error';
import { Splash } from './components/splash';
import { NotFound } from './components/not-found';

import { containerModule } from './classes/classes.di.ts';

import s from './default.module.scss';

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
  constructor(private readonly options: IApplicationOption) {
    container.loadSync(containerModule);
  }

  createView() {
    const routes = createBrowserRouter(
      [
        {
          id: 'root',
          element: <Content />,
          errorElement: (
            <div className={s.wrapper}>
              <Error />
            </div>
          ),
          hydrateFallbackElement: <Splash />,
          children: this.options.routes
            .map((route) => route.create(container))
            .filter((route) => route) as RouteObject[],
        },
        {
          path: '*',
          errorElement: (
            <div className={s.wrapper}>
              <Error />
            </div>
          ),
          element: <NotFound />,
        },
      ],
      {
        window: window,
        future: {},
        basename: this.options.basename ?? '/',
      },
    );

    if (import.meta.hot) {
      import.meta.hot.dispose(() => routes.dispose());
    }

    return () => {
      return (
        <LngProvider>
          <RouterProvider router={routes} />
        </LngProvider>
      );
    };
  }
}
