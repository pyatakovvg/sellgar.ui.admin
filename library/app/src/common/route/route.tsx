import React from 'react';
import * as ReactRouter from 'react-router-dom';
import * as ReactRouterCore from 'react-router';

import { contextProvider } from '../context';
import { ApplicationContext } from '../application';
import { LazyLoader, LazyLoaderInterface } from '../lazy-loader';

import { RouteProvider } from './route.provider.tsx';

import { RouteInterface } from './route.interface.ts';
import type { IOptions, IOptionsWithModule, IOptionsWithRoutes } from './route.interface.ts';

const Wrapper: React.FC<React.PropsWithChildren<IOptionsWithModule>> = (props) => {
  const navigation = ReactRouter.useNavigation();
  const matches = ReactRouter.useMatches();
  const dataRouterContext = React.useContext(ReactRouterCore.UNSAFE_DataRouterContext);
  const inProcess = Boolean(navigation.location);
  const applicationContext = contextProvider.get<ApplicationContext>(ApplicationContext);
  const router = dataRouterContext?.router;
  const currentLeafId = matches[matches.length - 1]?.id;
  const nextMatches =
    navigation.location && router
      ? ReactRouterCore.matchRoutes(router.routes, navigation.location, router.basename)
      : null;
  const nextLeafId = nextMatches?.[nextMatches.length - 1]?.route.id;
  const isSamePath = !navigation.location || (currentLeafId && nextLeafId && currentLeafId === nextLeafId);

  if (inProcess && !isSamePath) {
    if (!!props.fallback) {
      return <>{props.fallback}</>;
    } else if (!!applicationContext.options.components?.fallback) {
      return <>{applicationContext.options.components.fallback}</>;
    }
    return null;
  }

  return <>{props.children}</>;
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

  private createRouteWithModule(options: IOptionsWithModule): ReactRouter.RouteObject {
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
            shouldRevalidate: (args: ReactRouter.ShouldRevalidateFunctionArgs) => {
              if (args.currentUrl.pathname === args.nextUrl.pathname && args.currentUrl.search === args.nextUrl.search) {
                return false;
              }

              return args.defaultShouldRevalidate;
            },
            Component: () => (
              <Wrapper {...options}>
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

  private createRouteWithRoutes(options: IOptionsWithRoutes): ReactRouter.RouteObject {
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
