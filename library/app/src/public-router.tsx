import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Route } from './route.tsx';
import { Router } from './router.tsx';

import { Error } from './components/error';
import { NotFound } from './components/not-found';

export class PublicRouter {
  constructor(private readonly children: (Route | Router)[]) {}

  create(): RouteObject {
    return {
      path: import.meta.env.BASE_URL,
      errorElement: <Error />,
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
