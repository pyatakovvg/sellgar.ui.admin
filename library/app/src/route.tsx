import { UnauthorizedException } from '@library/domain';
import { uuid } from '@utils/generate';

import React from 'react';
import { Navigate, RouteObject, useRouteError, useNavigation } from 'react-router-dom';

import { useProfile } from './hook/useProfile.ts';

import { Error } from './components/error';
import { Loading } from './components/loading';
import { Forbidden } from './components/forbidden';

export interface IPropsWithAppRoute {
  route: Route;
}

interface IRouteOptions {
  roles?: string[];
  permissions?: string[];
  breadcrumb?(data?: any): string;
}

const CheckCredentials: React.FC<React.PropsWithChildren<IPropsWithAppRoute>> = (props) => {
  const profile = useProfile();
  const navigation = useNavigation();
  const inProcess = Boolean(navigation.location);

  const hasRoles = profile.checkRoles(props.route.roles);
  const hasPermissions = profile.checkPermissions(props.route.permissions);

  if (!hasRoles || !hasPermissions) {
    return <Forbidden />;
  }

  if (inProcess) {
    return <Loading />;
  }

  return props.children;
};

export class Route {
  readonly uuid = uuid();

  constructor(
    private readonly path: string,
    private readonly module: () => Promise<any>,
    private readonly options?: IRouteOptions,
  ) {}

  static normalizePath(path: string): string {
    if (path === '/') {
      return '';
    }
    return path.replace(/^\//gi, '');
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

  get content() {
    return this.module;
  }

  create(): RouteObject | null {
    return {
      path: Route.normalizePath(this.path),
      lazy: async () => {
        const { Module, loader } = await this.module();

        return {
          loader,
          Component: () => {
            return (
              <CheckCredentials route={this}>
                <Module />
              </CheckCredentials>
            );
          },
        };
      },
      ErrorBoundary: () => {
        const error = useRouteError();
        console.log(345354, error);
        if (error instanceof UnauthorizedException) {
          return <Navigate to={'/sign-in'} />;
        }
        return <Error />;
      },
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
    };
  }
}
