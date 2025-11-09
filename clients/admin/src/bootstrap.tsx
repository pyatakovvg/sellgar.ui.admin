import { NavigateLayout } from '@layout/navigate';
import { Application, Route, Router, PublicRouter, PrivateRouter } from '@library/app';
import { BaseLayout } from '@layout/base';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { RegisterAndUpdateServiceWorker } from './sw';

const app = new Application({
  routes: [
    /**
     * Контент, требующий авторизации
     */
    new PrivateRouter([
      new Router(
        '/',
        [
          new Route('/', () => import('@page/dashboard')),

          /**
           * Категория
           */
          new Router('categories', [new Route('/', () => import('@page/categories'))], {
            breadcrumb: () => 'Категории',
          }),

          /**
           * Бренд
           */
          new Router('brands', [new Route('/', () => import('@page/brands'))], {
            breadcrumb: () => 'Бренды',
          }),

          /**
           * Единица измерения
           */
          new Router('units', [new Route('/', () => import('@page/units'))], {
            breadcrumb: () => 'Единица измерения',
          }),

          /**
           * Свойства
           */
          new Router('properties', [new Route('/', () => import('@page/properties'))], {
            breadcrumb: () => 'Свойства',
          }),

          /**
           * Товары
           */
          new Router(
            'products',
            [
              new Route('/', () => import('@page/products')),
              new Route('create', () => import('@page/product-modify'), {
                breadcrumb: () => 'Добавить товар',
              }),
              new Route(':uuid', () => import('@page/product-modify'), {
                breadcrumb: (data) => data?.name ?? 'Ytn',
              }),
            ],
            {
              breadcrumb: () => 'Товары',
            },
          ),

          new Router(
            'store',
            [
              new Route('/', () => import('@page/store')),
              new Route('/create', () => import('@page/store-modify'), {
                breadcrumb: () => 'Добавить товар',
              }),
              new Route('/:uuid', () => import('@page/store-modify'), {
                breadcrumb: (data) => data.variant.name,
              }),
            ],
            {
              breadcrumb: () => 'Склад',
            },
          ),

          /**
           * Файлы
           */
          new Router('files', [new Route('/', () => import('@page/files'))], {
            breadcrumb: () => 'Файлы',
          }),
        ],
        {
          layout: <NavigateLayout />,
        },
      ),
    ]),

    /**
     * Общедоступный контент
     */
    new PublicRouter([
      new Router('/', [new Route('sign-in', () => import('@page/sign-in'))], {
        layout: <BaseLayout />,
      }),
    ]),
  ],
});

const AppView = app.createView();

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
  <>
    <RegisterAndUpdateServiceWorker />
    <AppView />
  </>,
);
