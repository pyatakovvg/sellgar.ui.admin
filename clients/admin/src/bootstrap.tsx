import { NavigateLayout } from '@library/layouts';
import { Application, Route, Router, PublicRouter, PrivateRouter } from '@library/app';

import React from 'react';
import ReactDOM from 'react-dom/client';

const app = new Application({
  routes: [
    new PrivateRouter([
      new Router(
        '/',
        [
          new Route('/', () => import('@admin/dashboard')),
          new Router(
            'category',
            [
              new Route('/', () => import('@admin/categories')),
              new Route('/create', () => import('@admin/category'), {
                breadcrumb: {
                  label: 'Создать категорию',
                },
              }),
              new Route('/:uuid', () => import('@admin/category'), {
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
          new Router('files', [new Route('/', () => import('@admin/files'))], {
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
    new PublicRouter([new Route('sign-in', () => import('@admin/sign-in'))]),
  ],
});

const AppView = app.createView();

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(<AppView />);
