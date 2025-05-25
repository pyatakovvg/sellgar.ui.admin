import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Route } from './route.tsx';
import { Router } from './router.tsx';

import { container } from './classes/container.di.ts';
import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

import { NotFound } from './components/not-found';

export class PrivateRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(): RouteObject {
    return {
      path: import.meta.env.BASE_URL,
      loader: async () => {
        const controller = container.get(ApplicationControllerInterface);

        if (!controller.applicationStore.initialized) {
          controller.applicationStore.setInitialize(true);

          await controller.loadProfile();
        }
      },
      children: [
        ...(this.children.map((route) => route.create()).filter((route) => route) as RouteObject[]),
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    };
  }
}
