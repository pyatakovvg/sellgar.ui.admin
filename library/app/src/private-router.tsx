import React from 'react';
import { Container } from 'inversify';
import { RouteObject } from 'react-router-dom';

import { NotFound } from './components/not-found';

import { Route } from './route.tsx';
import { Router } from './router.tsx';

import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

export class PrivateRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(container: Container): RouteObject {
    return {
      path: import.meta.env.BASE_URL,
      loader: async () => {
        const controller = container.get(ApplicationControllerInterface);

        if (!controller.applicationStore.auth) {
          await controller.loadProfile();
          controller.applicationStore.setAuth(true);
        }

        if (!controller.applicationStore.initialized) {
          controller.applicationStore.setInitialize(true);
        }
      },
      children: [
        ...(this.children.map((route) => route.create(container)).filter((route) => route) as RouteObject[]),
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    };
  }
}
