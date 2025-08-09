import { uuid } from '@utils/generate';
import { UnauthorizedException } from '@library/domain';

import React from 'react';
import { Container } from 'inversify';
import { Navigate, RouteObject, useRouteError, useNavigation, useParams, LoaderFunctionArgs } from 'react-router-dom';

import { useProfile } from './hook/profile.hook.ts';

import { RouteProvider } from './route.provider.tsx';

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

  static routeCache = new Map<string, any>();

  static createLazyRoute(Module: any) {
    if (Route.routeCache.has(Module)) {
      return Route.routeCache.get(Module);
    }
    const lazyRoute = new LazyRoute(Module);

    Route.routeCache.set(Module, lazyRoute);

    return lazyRoute;
  }

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

  create(container: Container): RouteObject | null {
    return {
      path: Route.normalizePath(this.path),
      lazy: async () => {
        try {
          const { ClassModule } = await this.importModule();

          const lazyRoute = Route.createLazyRoute(ClassModule);

          return {
            loader: (args: LoaderFunctionArgs) => {
              lazyRoute.create({
                container,
                params: args.params,
              });

              return lazyRoute.loader.call(lazyRoute, {
                container,
                params: args.params,
              });
            },
            Component: () => {
              const params = useParams();

              const Module = lazyRoute.render.bind(lazyRoute, {
                container,
                params,
              });

              React.useLayoutEffect(() => {
                return () => {
                  lazyRoute.destructor.call(lazyRoute, {
                    container,
                    params,
                  });
                };
              }, []);

              return (
                <CheckCredentials route={this}>
                  <RouteProvider>
                    <Module />
                  </RouteProvider>
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
