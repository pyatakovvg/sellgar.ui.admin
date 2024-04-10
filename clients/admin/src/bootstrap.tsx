import { Push } from '@library/push';
import { useTheme } from '@library/kit';
import { NavigateLayout, MainLayout, ShopLayout } from '@library/design';
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
              new Route('/', () => import('@module/dashboard')),

              new Route('/stock', () => import('@module/stock')),

              new Router('/users', [
                new Route('', () => import('@module/users')),
                new Route('create', () => import('@module/user')),
                new Route(':uuid', () => import('@module/user')),
              ]),

              new Router('/products', [
                new Route('', () => import('@module/products')),
                new Route('create', () => import('@module/product')),
                new Route(':uuid', () => import('@module/product')),
              ]),

              new Router(
                '/shops',
                [
                  new Route('', () => import('@module/products')),
                  new Route('create', () => import('@module/shop')),
                  new Route(':uuid', () => import('@module/shop')),
                ],
                {
                  layout: <ShopLayout />,
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
  <>
    <App />
    <Push />
  </>,
);
