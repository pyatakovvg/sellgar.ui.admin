import React from 'react';
import * as ReactRouter from 'react-router-dom';

import { contextProvider } from '../context';
import { ApplicationContext } from '../application';
import { LazyLoader, LazyLoaderInterface } from '../lazy-loader';

import { Loading } from './components/loading';

import { RouteProvider } from './route.provider.tsx';

import { RouteInterface, type IOptions } from './route.interface.ts';

const Wrapper: React.FC<React.PropsWithChildren> = (props) => {
  const navigation = ReactRouter.useNavigation();
  const inProcess = Boolean(navigation.location);

  if (inProcess) {
    return <Loading />;
  }
  return props.children;
};

export class Route implements RouteInterface {
  constructor(private readonly options: IOptions) {}

  private createRouteWithModule(options: IOptions): ReactRouter.RouteObject {
    const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);

    if (!('module' in options)) {
      throw new Error('Required options must be an object');
    }

    return {
      index: !this.options.path,
      path: this.options.path ? this.options.path?.replace(/^\//, '') : undefined,
      handle: {
        crumb: (data: never) => {
          if (this.options?.breadcrumb) {
            return {
              href: this.options.path,
              label:
                typeof this.options.breadcrumb === 'string' ? this.options.breadcrumb : this.options.breadcrumb(data),
            };
          }
          return null;
        },
      },
      errorElement: applicationContext.options.components!.exception,
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
            element: (
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

    if (!('routes' in options)) {
      throw new Error('Required options must be an object');
    }

    return {
      path: options.path.replace(/^\//, ''),
      handle: {
        crumb: (data: never) => {
          if (this.options?.breadcrumb) {
            return {
              href: this.options.path,
              label:
                typeof this.options.breadcrumb === 'string' ? this.options.breadcrumb : this.options.breadcrumb(data),
            };
          }
          return null;
        },
      },
      element:
        'layout' in this.options && this.options.layout ? (
          this.options.layout(<ReactRouter.Outlet />)
        ) : (
          <ReactRouter.Outlet />
        ),
      children: [
        ...options.routes.map((route) => route.create()),
        {
          path: '*',
          element: applicationContext.options.components!.notFound,
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
