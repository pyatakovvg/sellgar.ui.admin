import { controller as pushController } from '@library/push';

import React from 'react';
import { observer } from 'mobx-react';
import { RouteObject, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { useApp } from './hook/useApp';

import { Spinner } from './components/Spinner';
import { Error } from './components/Error';
import { emitter } from './application.emitter.ts';
import { APPLICATION_ERROR, APPLICATION_UNAUTHORIZED } from './variables.ts';

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

  get content() {
    return this.children;
  }

  create(): RouteObject {
    return {
      path: this.path,
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
