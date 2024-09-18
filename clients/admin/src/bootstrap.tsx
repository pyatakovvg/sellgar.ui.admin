import { Push } from '@library/push';
import { useTheme, DialogProvider } from '@library/kit';
import { BreadcrumbsProvider } from '@library/breadcrumbs';
import { NavigateLayout, MainLayout, ShopLayout, UserLayout } from '@library/design';
import { Application, Route, Router, PublicRouter, PrivateRouter } from '@library/app';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { signInRoute } from './routes/public/sign-in.route.ts';

import { usersRoute } from './routes/private/users/users.route.ts';
import { userOptionsRoute } from './routes/private/users/user-options.route.ts';
import { createUserRoute } from './routes/private/users/create-user.route.ts';
import { updateUserRoute } from './routes/private/users/update-user.route.ts';

const app = new Application({
  routes: [
    new PrivateRouter([
      new Router(
        '/',
        [
          new Router(
            '/',
            [
              new Route('/', () => import('@admin/dashboard'), {
                roles: [],
                permissions: [],
                breadcrumb: {
                  label: 'Dashboard',
                },
              }),

              new Router('/users', [usersRoute, userOptionsRoute], {
                layout: <UserLayout />,
                breadcrumb: {
                  label: 'Пользователи',
                },
              }),

              new Router('/users', [createUserRoute, updateUserRoute], {
                breadcrumb: {
                  label: 'Пользователи',
                },
              }),

              new Router(
                '/stock',
                [
                  new Route('/', () => import('@admin/stock')),
                  new Route('/create', () => import('@admin/product'), {
                    breadcrumb: {
                      label: 'Новый товар',
                    },
                  }),
                  new Route('/:uuid', () => import('@admin/product')),
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
                  new Route('/', () => import('@admin/shops')),
                  new Route('/options', () => import('@admin/shops'), {
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
                'shops',
                [
                  new Route('create', () => import('@admin/shop'), {
                    breadcrumb: {
                      label: 'Новый магазин',
                    },
                  }),
                  new Router(
                    ':uuid',
                    [
                      new Route('/', () => import('@admin/shop'), {
                        breadcrumb: {
                          label: 'Имформация',
                        },
                      }),
                      new Route('options', () => import('@admin/shop'), {
                        breadcrumb: {
                          label: 'Настройки',
                        },
                      }),
                    ],
                    {
                      layout: <ShopLayout />,
                      breadcrumb: {
                        id: 'SHOP_INFORMATION',
                      },
                    },
                  ),
                ],
                {
                  breadcrumb: {
                    label: 'Магазины',
                  },
                },
              ),

              new Router(
                '/buckets',
                [
                  new Route('/:bucketName', () => import('@admin/files'), {
                    breadcrumb: {
                      label: 'Файлы',
                    },
                  }),
                  new Route('/', () => import('@admin/buckets')),
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

    new PublicRouter([
      signInRoute,
      new Route('/dashboard', () => import('@admin/dashboard2'), {
        roles: [],
        permissions: [],
        breadcrumb: {
          label: 'Dashboard',
        },
      }),
    ]),
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
