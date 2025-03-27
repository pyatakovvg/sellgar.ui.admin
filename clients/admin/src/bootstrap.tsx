import { NavigateLayout } from '@layout/navigate';
import { Application, Route, Router, PublicRouter, PrivateRouter } from '@library/app';

import React from 'react';
import ReactDOM from 'react-dom/client';

const app = new Application({
  routes: [
    /**
     * Контент требующий авторизации
     */
    new PrivateRouter([
      new Router(
        '/',
        [
          new Route('/', () => import('@page/dashboard')),

          /**
           * Категория
           */
          new Router(
            'categories',
            [
              new Route('/', () => import('@page/categories')),
              new Route('/create', () => import('@page/category-modify'), {
                breadcrumb: () => 'Создать категорию',
              }),
              new Route('/:uuid', () => import('@page/category-modify'), {
                breadcrumb: (data) => data?.name ?? '',
              }),
            ],
            {
              breadcrumb: () => 'Категории',
            },
          ),

          /**
           * Бренд
           */
          new Router(
            'brands',
            [
              new Route('/', () => import('@page/brands')),
              new Route('/create', () => import('@page/brand-modify'), {
                breadcrumb: () => 'Создать бренд',
              }),
              new Route('/:uuid', () => import('@page/brand-modify'), {
                breadcrumb: (data) => data.name,
              }),
            ],
            {
              breadcrumb: () => 'Бренды',
            },
          ),

          /**
           * Единица измерения
           */
          new Router(
            'units',
            [
              new Route('/', () => import('@page/units')),
              new Route('/create', () => import('@page/unit-modify'), {
                breadcrumb: () => 'Создать единицу измерения',
              }),
              new Route('/:uuid', () => import('@page/unit-modify'), {
                breadcrumb: (data) => data.name,
              }),
            ],
            {
              breadcrumb: () => 'Единица измерения',
            },
          ),

          /**
           * Свойства
           */
          new Router(
            'properties',
            [
              new Route('/', () => import('@page/properties')),
              new Route('/create', () => import('@page/property-modify'), {
                breadcrumb: () => 'Создать свойство',
              }),
              new Route('/:uuid', () => import('@page/property-modify'), {
                breadcrumb: (data) => data.name,
              }),

              /**
               * Группа свойств
               */
              new Router('groups', [
                new Route('/create', () => import('@page/property-group-modify'), {
                  breadcrumb: () => 'Создать группу свойств',
                }),
                new Route('/:uuid', () => import('@page/property-group-modify'), {
                  breadcrumb: (data) => data.name,
                }),
              ]),
            ],
            {
              breadcrumb: () => 'Свойства',
            },
          ),

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
                breadcrumb: (data) => data.name,
              }),
            ],
            {
              breadcrumb: () => 'Товары',
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
    new PublicRouter([new Route('sign-in', () => import('@page/sign-in'))]),
  ],
});

const AppView = app.createView();

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(<AppView />);
