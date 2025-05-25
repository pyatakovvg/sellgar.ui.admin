import { uuid } from '@utils/generate';
import { UnauthorizedException } from '@library/domain';

import React from 'react';
import { Navigate, RouteObject, useRouteError, useNavigation, LoaderFunctionArgs } from 'react-router-dom';

import { useProfile } from './hook/useProfile.ts';

import { Error } from './components/error';
import { Loading } from './components/loading';
import { Forbidden } from './components/forbidden';
import { ErrorLoadingModule } from './components/error-loading-module';

import { LazyRoute } from './lazy-route.tsx';

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
    private readonly importModule: () => Promise<any>,
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

  create(): RouteObject | null {
    return {
      path: Route.normalizePath(this.path),
      lazy: async () => {
        try {
          const { ClassModule } = await this.importModule();

          const lazyRoute = new LazyRoute(ClassModule);

          return {
            loader: (args: LoaderFunctionArgs) => {
              lazyRoute.create();

              return lazyRoute.loader.call(lazyRoute, args);
            },
            Component: async () => {
              const Module = lazyRoute.render.bind(lazyRoute);

              React.useLayoutEffect(() => {
                return () => {
                  lazyRoute.destructor.call(lazyRoute);
                };
              }, []);

              return (
                <CheckCredentials route={this}>
                  <Module />
                </CheckCredentials>
              );
            },
          };
        } catch (error) {
          return {
            Component: () => {
              return <ErrorLoadingModule error={error as Error} />;
            },
          };
        }
      },
      ErrorBoundary: () => {
        const error = useRouteError();

        if (error instanceof UnauthorizedException) {
          return <Navigate to={import.meta.env.BASE_URL.replace(/\/$/gi, '') + '/sign-in'} />;
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
