import React from 'react';
import { Container } from 'inversify';
import { RouteObject } from 'react-router-dom';

import { NotFound } from './components/not-found';

import { Route } from './route.tsx';
import { Router } from './router.tsx';

import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

export class PublicRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(container: Container): RouteObject {
    return {
      loader: () => {
        const controller = container.get(ApplicationControllerInterface);

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
