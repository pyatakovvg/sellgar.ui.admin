import { UnauthorizedException } from '@library/domain';

import React from 'react';
import { RouteObject, useRouteError, Navigate } from 'react-router-dom';

import { Route } from './route.tsx';
import { Router } from './router.tsx';
import { controller } from './classes/classes.di.ts';

import { Error } from './components/error';
import { NotFound } from './components/not-found';

export class PrivateRouter {
  private _isInitialized: boolean = false;

  constructor(private readonly children: (Route | Router)[]) {}

  create(): RouteObject {
    return {
      path: import.meta.env.BASE_URL,
      loader: async () => {
        if (!this._isInitialized) {
          this._isInitialized = true;
          await controller.loadProfile();
        }
        return true;
      },
      ErrorBoundary: () => {
        const error = useRouteError();

        if (error instanceof UnauthorizedException) {
          return <Navigate to={import.meta.env.BASE_URL + 'sign-in'} />;
        }
        return <Error />;
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
