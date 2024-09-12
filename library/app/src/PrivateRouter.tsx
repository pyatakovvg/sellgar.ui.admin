import { controller as push } from '@library/push';

import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate, Outlet, RouteObject } from 'react-router-dom';

import { Route } from './Route.tsx';
import { Router } from './Router.tsx';

import { useApp } from './hook/useApp.ts';
import { useAuthInterceptor } from './hook/useAuthInterceptor.ts';

import { Splash } from './components/Splash';

const CheckAuth: React.FC = observer(() => {
  const navigate = useNavigate();
  const { presenter } = useApp();

  const interceptor = useAuthInterceptor(async () => {
    try {
      await presenter.getProfile();
    } catch (e) {
      const error = e as any;
      console.log(error);

      navigate('/sign-in');

      if (error.status !== 401) {
        push.add({ title: 'Ошибка авторизации', variant: 'danger', content: error.message });
      }
    } finally {
      setTimeout(() => presenter.setApplicationInitialized(), 100);
    }
  });

  React.useEffect(() => {
    (async () => {
      if (!presenter.initialized) {
        await interceptor.intercept();
      }
    })();
  }, []);

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
