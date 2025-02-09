import { NavigateLayout } from '@admin/layouts';
import { Application, Route, Router, PublicRouter, PrivateRouter } from '@library/app';

import React from 'react';
import ReactDOM from 'react-dom/client';

const app = new Application({
  routes: [
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
                breadcrumb: {
                  label: 'Создать категорию',
                },
              }),
              new Route('/:uuid', () => import('@page/category-modify'), {
                breadcrumb: {
                  id: 'CATEGORY_MODIFY',
                },
              }),
            ],
            {
              breadcrumb: {
                label: 'Категории',
              },
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
                breadcrumb: {
                  label: 'Создать бренд',
                },
              }),
              new Route('/:uuid', () => import('@page/brand-modify'), {
                breadcrumb: {
                  id: 'BRAND_MODIFY',
                },
              }),
            ],
            {
              breadcrumb: {
                label: 'Бренды',
              },
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
                breadcrumb: {
                  label: 'Создать единицу измерения',
                },
              }),
              new Route('/:uuid', () => import('@page/unit-modify'), {
                breadcrumb: {
                  id: 'UNIT_MODIFY',
                },
              }),
            ],
            {
              breadcrumb: {
                label: 'Единица измерения',
              },
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
                breadcrumb: {
                  label: 'Создать свойство',
                },
              }),
              new Route('/:uuid', () => import('@page/property-modify'), {
                breadcrumb: {
                  id: 'PROPERTY_MODIFY',
                },
              }),

              /**
               * Группа свойств
               */
              new Router('groups', [
                new Route('/create', () => import('@page/property-group-modify'), {
                  breadcrumb: {
                    label: 'Создать группу свойств',
                  },
                }),
                new Route('/:uuid', () => import('@page/property-group-modify'), {
                  breadcrumb: {
                    id: 'PROPERTY_GROUP_MODIFY',
                  },
                }),
              ]),
            ],
            {
              breadcrumb: {
                label: 'Свойства',
              },
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
                breadcrumb: {
                  label: 'Добавить товар',
                },
              }),
              new Route(':uuid', () => import('@page/product-modify'), {
                breadcrumb: {
                  id: 'PRODUCT_MODIFY',
                },
              }),
            ],
            {
              breadcrumb: {
                label: 'Товары',
              },
            },
          ),

          /**
           * Файлы
           */
          new Router('files', [new Route('/', () => import('@page/files'))], {
            breadcrumb: {
              label: 'Файлы',
            },
          }),
        ],
        {
          layout: <NavigateLayout />,
        },
      ),
    ]),
    new PublicRouter([new Route('sign-in', () => import('@page/sign-in'))]),
  ],
});

const AppView = app.createView();

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(<AppView />);
