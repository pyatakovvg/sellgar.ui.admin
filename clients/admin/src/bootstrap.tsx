import { Application, Router, PublicRoutes, PrivateRoutes, Route } from '@library/app';

import { BaseLayout } from '@layout/base';
import { NavigateLayout } from '@layout/navigate';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { RegisterAndUpdateServiceWorker } from './sw';

import { containerModule } from './container.module.ts';

const app = new Application({
  router: new Router({
    routes: [
      new PrivateRoutes({
        layout: (outlet) => <NavigateLayout>{outlet}</NavigateLayout>,
        routes: [
          new Route({
            path: '/',
            module: () => import('@page/dashboard'),
          }),
          new Route({
            path: '/products',
            breadcrumb: 'Товары',
            routes: [
              new Route({
                module: () => import('@page/products'),
              }),
              new Route({
                path: '/create',
                breadcrumb: 'Новый товар',
                module: () => import('@page/product-modify'),
              }),
              new Route({
                path: '/:uuid',
                breadcrumb: ([data]: any) => data.name,
                module: () => import('@page/product-modify'),
              }),
            ],
          }),
          new Route({
            path: '/brands',
            breadcrumb: 'Бренд',
            routes: [
              new Route({
                module: () => import('@page/brands'),
              }),
            ],
          }),
          new Route({
            path: '/categories',
            breadcrumb: 'Категория',
            module: () => import('@page/categories'),
          }),
          new Route({
            path: '/units',
            breadcrumb: 'Единица измерения',
            module: () => import('@page/units'),
          }),
          new Route({
            path: '/properties',
            breadcrumb: 'Свойства',
            module: () => import('@page/properties'),
          }),
        ],
      }),
      new PublicRoutes({
        layout: (outlet) => <BaseLayout>{outlet}</BaseLayout>,
        routes: [
          new Route({
            path: '/sign-in',
            module: () => import('@page/sign-in'),
          }),
        ],
      }),
    ],
  }),
});

app.container.bind(containerModule);

const AppView = app.createView();

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
  <>
    <RegisterAndUpdateServiceWorker />
    <AppView />
  </>,
);
