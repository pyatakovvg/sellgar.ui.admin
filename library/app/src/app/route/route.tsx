import { UnauthorizedException, HttpException } from '@library/domain';

import React from 'react';
import { Container } from 'inversify';
import * as ReactRouter from 'react-router-dom';

import { type IClassModule, type IClassModuleArgs, Module } from './module';
import { Exception } from '../../components/exception';
import { Loading } from '../../components/loading';
import { Forbidden } from '../../components/forbidden';
import { ErrorLoadingModule } from '../../components/error-loading-module';

import { RouteProvider } from './route.provider.tsx';

import { useProfile } from '../../hook/profile.hook.ts';

import { ApplicationControllerInterface } from '../../classes/controller/application-controller.interface.ts';

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
  const navigation = ReactRouter.useNavigation();
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
  static createLazyRoute(ClassModule: { new (args: IClassModuleArgs): IClassModule }) {
    return new Module(ClassModule);
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

  create(container: Container): ReactRouter.RouteObject | null {
    return {
      path: Route.normalizePath(this.path),
      lazy: async () => {
        try {
          const { ClassModule } = await this.importModule();

          const lazyRoute = Route.createLazyRoute(ClassModule);

          return {
            loader: (args: ReactRouter.LoaderFunctionArgs) => {
              lazyRoute.create({
                container,
                params: args.params,
                controller: container.get(ApplicationControllerInterface),
              });

              return lazyRoute.loader.call(lazyRoute, {
                container,
                params: args.params,
                controller: container.get(ApplicationControllerInterface),
              });
            },
            Component: () => {
              const params = ReactRouter.useParams();

              const Module = lazyRoute.render.bind(lazyRoute, {
                params,
                container,
                controller: container.get(ApplicationControllerInterface),
              });

              React.useLayoutEffect(() => {
                return () => {
                  lazyRoute.destructor.call(lazyRoute, {
                    params,
                    container,
                    controller: container.get(ApplicationControllerInterface),
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
              return <ErrorLoadingModule error={error as HttpException} />;
            },
          };
        }
      },
      ErrorBoundary: () => {
        const error = ReactRouter.useRouteError();

        if (error instanceof UnauthorizedException) {
          return <ReactRouter.Navigate to={import.meta.env.BASE_URL.replace(/\/$/gi, '') + '/sign-in'} />;
        }
        return <Exception />;
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
