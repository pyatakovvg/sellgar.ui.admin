import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { contextProvider } from '../context';
import { ApplicationContext } from '../application';
import { LazyLoader, LazyLoaderInterface } from '../lazy-loader';

import { RouteProvider } from './route.provider.tsx';

import { RouteInterface, type IOptions } from './route.interface.ts';

const Wrapper: React.FC<React.PropsWithChildren> = (props) => {
  const navigation = ReactRouter.useNavigation();
  const location = ReactRouter.useLocation();
  const inProcess = Boolean(navigation.location);
  const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
  const isSamePath = navigation.location?.pathname === location.pathname;

  if (inProcess && !isSamePath) {
    return applicationContext.options.components?.loading;
  }
  return props.children;
};

export class Route implements RouteInterface {
  constructor(private readonly options: IOptions) {}

  private createCrumb() {
    if (!this.options?.breadcrumb) {
      return null;
    }
    return (data: never) => ({
      href: this.options.path,
      label: typeof this.options.breadcrumb === 'string' ? this.options.breadcrumb : this.options?.breadcrumb?.(data),
    });
  }

  private createRouteWithModule(options: IOptions): ReactRouter.RouteObject {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
    const components = applicationContext.options.components;

    if (!('module' in options)) {
      throw new Error('Required options must be an object');
    }

    return {
      index: !this.options.path,
      path: this.options.path ? this.options.path?.replace(/^\//, '') : undefined,
      handle: {
        crumb: this.createCrumb(),
      },
      errorElement: components?.exception ?? null,
      lazy: async () => {
        try {
          const module = await options.module();
          const classModule = Object.keys(module);
          const constructorModule = module[classModule[0]];

          const lazyLoader: LazyLoaderInterface = new LazyLoader(constructorModule);

          return {
            loader: async (args: ReactRouter.LoaderFunctionArgs) => {
              lazyLoader.create.call(lazyLoader, args);

              return await lazyLoader.loader.call(lazyLoader, args);
            },
            Component: () => (
              <Wrapper>
                <RouteProvider>{lazyLoader.render.call(lazyLoader)}</RouteProvider>
              </Wrapper>
            ),
          };
        } catch (error) {
          console.error('Route: lazy error', error);
          return {
            loader: () => {
              throw error;
            },
          };
        }
      },
    };
  }

  private createRouteWithRoutes(options: IOptions): ReactRouter.RouteObject {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
    const components = applicationContext.options.components;

    if (!('routes' in options)) {
      throw new Error('Required options must be an object');
    }

    if (!options.path) {
      throw new Error('Route: "path" is required for route groups');
    }

    return {
      path: options.path.replace(/^\//, ''),
      handle: {
        crumb: this.createCrumb(),
      },
      errorElement: components?.exception ?? null,
      Component: () =>
        'layout' in this.options && this.options.layout ? (
          this.options.layout(<ReactRouter.Outlet />)
        ) : (
          <ReactRouter.Outlet />
        ),
      children: [
        ...options.routes.map((route) => route.create()),
        {
          path: '*',
          element: components?.notFound ?? null,
        },
      ],
    };
  }

  create() {
    if ('routes' in this.options) {
      return this.createRouteWithRoutes(this.options);
    }
    return this.createRouteWithModule(this.options);
  }
}
