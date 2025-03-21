import { uuid } from '@utils/generate';

import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { Route } from './route.tsx';

import { useProfile } from './hook/useProfile.ts';

import { Error } from './components/error';
import { NotFound } from './components/not-found';
import { Forbidden } from './components/forbidden';

interface IOptionsRoute {
  layout?: React.ReactNode;
  roles?: string[];
  permissions?: string[];
  breadcrumb?(data: any): string;
}

export interface IPropsWithAppRouter {
  router: Router;
}

const CheckCredentials: React.FC<React.PropsWithChildren<IPropsWithAppRouter>> = (props) => {
  const profile = useProfile();

  const hasRoles = profile.checkRoles(props.router.roles);
  const hasPermissions = profile.checkPermissions(props.router.permissions);

  if (!hasRoles || !hasPermissions) {
    return <Forbidden />;
  }

  if (!props.children) {
    return <Outlet />;
  }

  return props.children;
};

export class Router {
  readonly uuid = uuid();

  constructor(
    private readonly path: string,
    private readonly children: (Route | Router)[],
    private readonly options?: IOptionsRoute,
  ) {}

  static normalizePath(path: string): string {
    if (path === '/') {
      return '';
    }
    return path.replace(/^\/$/gi, '');
  }

  get roles() {
    return this.options?.roles ?? [];
  }

  get permissions() {
    return this.options?.permissions ?? [];
  }

  get breadcrumbs() {
    return this.options?.breadcrumb ?? null;
  }

  create(): RouteObject {
    return {
      handle: {
        crumb: (data: any) => {
          if (this.options?.breadcrumb) {
            return {
              href: this.path,
              label: this.options.breadcrumb(data),
            };
          }
          return null;
        },
      },
      path: Router.normalizePath(this.path),
      errorElement: <Error />,
      element: <CheckCredentials router={this}>{this.options?.layout}</CheckCredentials>,
      children: [
        ...(this.children.map((route) => route.create()).filter((route) => route) as RouteObject[]),
        {
          path: '*',
          element: <NotFound />,
          handle: {
            crumb: () => ({
              label: 'Страница не найдена',
            }),
          },
        },
      ],
    };
  }
}
