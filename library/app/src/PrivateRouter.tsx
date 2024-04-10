import React from 'react';
import { observer } from 'mobx-react';
import { Outlet, RouteObject, useNavigate } from 'react-router-dom';

import { Route } from './Route.tsx';
import { Router } from './Router.tsx';

import { useApp } from './hook/useApp.ts';
import { emitter } from './application.emitter.ts';

import { APPLICATION_UNAUTHORIZED } from './variables.ts';

const CheckAuth: React.FC = observer(() => {
  const navigate = useNavigate();
  const { controller } = useApp();

  React.useEffect(() => {
    if (!controller.initialized) {
      (async () => {
        await controller.getUser();
        controller.setApplicationInitialized();
      })();
    }
  }, [controller.initialized]);

  React.useEffect(() => {
    emitter.on('application', (result) => {
      if (result) {
        switch (result.type) {
          case APPLICATION_UNAUTHORIZED:
            return navigate('/sign-in');
        }
      }
    });
  }, []);

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
