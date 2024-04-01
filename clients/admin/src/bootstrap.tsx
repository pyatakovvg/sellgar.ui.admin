import { Push } from '@library/push';
import { useTheme } from '@library/kit';
import { BaseLayout, MainLayout, SecondaryLayout } from '@library/design';
import { Application, Route } from '@library/app';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Error } from './components/Error';
import { Loader } from './components/Loader';
import { Splash } from './components/Splash';

const app = new Application({
  layout: MainLayout,
  routes: [
    new Route('/', () => import('@module/dashboard'), {
      layout: BaseLayout,
      isCacheable: true,
    }),

    new Route('/stock', () => import('@module/stock'), {
      layout: BaseLayout,
    }),

    new Route(
      '/users/*',
      [
        new Route('/', () => import('@module/users')),
        new Route('/create', () => import('@module/user')),
        new Route('/:uuid', () => import('@module/user')),
      ],
      {
        layout: BaseLayout,
      },
    ),

    new Route(
      '/products/*',
      [new Route('/', () => import('@module/products')), new Route('/:uuid', () => import('@module/product'))],
      {
        layout: BaseLayout,
      },
    ),

    new Route(
      '/shops/*',
      [
        new Route('/', () => import('@module/products'), {
          layout: SecondaryLayout,
        }),
        new Route('/create', () => import('@module/shop'), {
          layout: SecondaryLayout,
        }),
        new Route('/:uuid', () => import('@module/shop'), {
          layout: SecondaryLayout,
        }),
      ],
      {
        layout: BaseLayout,
      },
    ),

    new Route('/sign-in', () => import('@module/sign-in'), { isPublic: true }),

    new Route('/error', import('./pages/Error'), { isPublic: true }),
    new Route('*', import('./pages/NotPage'), { isPublic: true }),
  ],
});

const AppView = app.createView();

const root = ReactDOM.createRoot(document.querySelector('#root')!);

const App = () => {
  const theme = useTheme();

  React.useEffect(() => {
    theme.setTheme('LIGHT');
  }, []);

  return <AppView Splash={Splash} Error={Error} Loader={Loader} />;
};

root.render(
  <>
    <App />
    <Push />
  </>,
);
