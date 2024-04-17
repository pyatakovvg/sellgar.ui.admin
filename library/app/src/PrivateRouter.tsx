import React from 'react';
import { observer } from 'mobx-react';
import { Outlet, RouteObject } from 'react-router-dom';

import { Route } from './Route.tsx';
import { Router } from './Router.tsx';

import { useApp } from './hook/useApp.ts';
import { useAuthInterceptor } from './hook/useAuthInterceptor.ts';

import { Splash } from './components/Splash';

const CheckAuth: React.FC = observer(() => {
  const { profile, presenter } = useApp();

  const interceptor = useAuthInterceptor(async () => {
    await profile.getProfile();
  });

  React.useEffect(() => {
    (async () => {
      if (!presenter.initialized) {
        await interceptor.intercept();
        presenter.setApplicationInitialized();
      }
    })();
  }, [presenter.initialized]);

  if (!presenter.initialized) {
    return <Splash />;
  }
  return <Outlet />;
});

export class PrivateRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(): RouteObject {
    return {
      element: <CheckAuth />,
      children: this.children.map((route) => route.create()).filter((route) => route) as RouteObject[],
    };
  }
}
