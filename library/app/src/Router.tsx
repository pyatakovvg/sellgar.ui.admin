import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Route } from './Route.tsx';

import { NotPage } from './components/NotPage';

interface IOptionsRoute {
  layout?: React.ReactNode;
}

export class Router {
  constructor(
    private readonly path: string,
    private readonly children: (Route | Router)[],
    private readonly options?: IOptionsRoute,
  ) {}

  static normalizePath(path: string): string {
    if (path === '/') {
      return '/';
    }
    return path.replace(/\/$/gi, '') + '/*';
  }

  create(): RouteObject {
    return {
      path: Router.normalizePath(this.path),
      element: this.options?.layout ?? null,
      children: [
        ...this.children.map((route) => route.create()),
        {
          path: '*',
          element: <NotPage />,
        },
      ],
    };
  }
}
