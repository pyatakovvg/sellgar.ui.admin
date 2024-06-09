import { Push } from '@library/push';
import { useTheme, DialogProvider, BreadcrumbsProvider } from '@library/kit';
import { NavigateLayout, MainLayout, ShopLayout, UserLayout } from '@library/design';
import { Application, Route, Router, PublicRouter, PrivateRouter } from '@library/app';

import React from 'react';
import ReactDOM from 'react-dom/client';

const app = new Application({
  routes: [
    new PrivateRouter([
      new Router(
        '/',
        [
          new Router(
            '/',
            [
              new Route('/', () => import('@module/dashboard'), {
                roles: [],
                permissions: [],
                breadcrumb: {
                  label: 'Dashboard',
                },
              }),

              new Router(
                '/users',
                [
                  new Route('/', () => import('@module/users')),
                  new Route('/options', () => import('@module/user-options'), {
                    breadcrumb: {
                      label: 'Настройки',
                    },
                  }),
                ],
                {
                  layout: <UserLayout />,
                  breadcrumb: {
                    label: 'Пользователи',
                  },
                },
              ),

              new Router(
                '/users',
                [new Route('/create', () => import('@module/user')), new Route('/:uuid', () => import('@module/user'))],
                {
                  breadcrumb: {
                    label: 'Пользователи',
                  },
                },
              ),

              new Router(
                '/stock',
                [
                  new Route('/', () => import('@module/stock')),
                  new Route('/create', () => import('@module/product'), {
                    breadcrumb: {
                      label: 'Новый товар',
                    },
                  }),
                  new Route('/:uuid', () => import('@module/product')),
                ],
                {
                  roles: ['ADMIN'],
                  breadcrumb: {
                    label: 'Склад',
                  },
                },
              ),

              new Router(
                '/shops',
                [
                  new Route('/', () => import('@module/shops')),
                  new Route('/options', () => import('@module/shops'), {
                    breadcrumb: {
                      label: 'Настройки',
                    },
                  }),
                ],
                {
                  layout: <ShopLayout />,
                  breadcrumb: {
                    label: 'Магазины',
                  },
                },
              ),

              new Router(
                '/shops',
                [new Route('/create', () => import('@module/shop')), new Route('/:uuid', () => import('@module/shop'))],
                {
                  breadcrumb: {
                    label: 'Магазины',
                  },
                },
              ),

              new Router(
                '/buckets',
                [
                  new Route('/:bucketName', () => import('@module/files'), {
                    breadcrumb: {
                      label: 'Файлы',
                    },
                  }),
                  new Route('/', () => import('@module/buckets')),
                ],
                {
                  breadcrumb: {
                    label: 'Хранилище',
                  },
                },
              ),
            ],
            {
              layout: <NavigateLayout />,
            },
          ),
        ],
        {
          layout: <MainLayout />,
        },
      ),
    ]),

    new PublicRouter([new Route('/sign-in', () => import('@module/sign-in'))]),
  ],
});

const AppView = app.createView();

const root = ReactDOM.createRoot(document.querySelector('#root')!);

const App = () => {
  const theme = useTheme();

  React.useEffect(() => {
    theme.setTheme('LIGHT');
  }, []);

  return <AppView />;
};

root.render(
  <BreadcrumbsProvider>
    <App />
    <DialogProvider />
    <Push />
  </BreadcrumbsProvider>,
);
