import React from 'react';
import { observer } from 'mobx-react';
import { Outlet, RouteObject } from 'react-router-dom';

import { Route } from './Route.tsx';
import { Router } from './Router.tsx';

import { useApp } from './hook/useApp.ts';
import { useRequest } from './hook/useRequest.ts';

import { Check } from './components/Check';
import { NotPage } from './components/NotPage';

const CheckAuth: React.FC = observer(() => {
  const { isInitialized, setInitialized, loadProfile } = useApp();

  const request = useRequest(async () => {
    await loadProfile();
  });

  React.useEffect(() => {
    (async () => {
      if (!isInitialized) {
        await request();
        setTimeout(() => setInitialized(), 100);
      }
    })();
  }, []);

  if (!isInitialized) {
    return <Check />;
  }
  return <Outlet />;
});

export class PrivateRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(): RouteObject {
    return {
      path: import.meta.env.BASE_URL,
      element: <CheckAuth />,
      children: [
        ...(this.children.map((route) => route.create()).filter((route) => route) as RouteObject[]),
        {
          path: '*',
          element: <NotPage />,
        },
      ],
    };
  }
}
