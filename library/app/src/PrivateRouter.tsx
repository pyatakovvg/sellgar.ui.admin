import React from 'react';
import { observer } from 'mobx-react';
import { Outlet, RouteObject } from 'react-router-dom';

import { Route } from './Route.tsx';
import { Router } from './Router.tsx';

import { useApp } from './hook/useApp.ts';

const CheckAuth: React.FC = observer(() => {
  const { controller } = useApp();

  React.useEffect(() => {
    if (!controller.initialized) {
      (async () => {
        await controller.getUser();
        controller.setApplicationInitialized();
      })();
    }
  }, [controller.initialized]);

  if (!controller.initialized) {
    return null;
  }
  return <Outlet />;
});

export class PrivateRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(): RouteObject {
    return {
      element: <CheckAuth />,
      children: this.children.map((route) => route.create()),
    };
  }
}
