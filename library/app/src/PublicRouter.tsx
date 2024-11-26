import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Route } from './Route.tsx';
import { Router } from './Router.tsx';
import { NotPage } from './components/NotPage';

export class PublicRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(): RouteObject {
    return {
      path: import.meta.env.BASE_URL,
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
