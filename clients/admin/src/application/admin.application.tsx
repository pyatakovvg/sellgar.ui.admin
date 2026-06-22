import { Application, Route, Router, UseBindings } from '@tiyn/app';
import type { ApplicationConfiguratorInterface } from '@tiyn/app';

import { AppLayout } from '@layout/app';
import { BaseLayout } from '@layout/base';
import { NavigateLayout } from '@layout/navigate';
import { BrandModifyFrame } from '@drawer/brand-modify';
import { StoreModifyFrame } from '@drawer/store-modify';

import { Exception, Failed } from './components/exception';
import { Loading } from './components/loading';
import { NotFound } from './components/not-found';
import { Splash } from './components/splash';

import { AdminBindings } from './bindings';
import { ResolveAuthStateInitializer } from './initializers';
import { RequireAnonymousSessionPolicy, RequireAuthenticatedSessionPolicy } from './policies';

@UseBindings(AdminBindings)
export class AdminApplication extends Application {
  protected configure(app: ApplicationConfiguratorInterface): void {
    app.components({
      splash: <Splash />,
      fallback: <Loading />,
      exception: <Exception />,
      failed: <Failed />,
      notFound: <NotFound />,
    });

    app.layouts([AppLayout]);
    app.initializers([ResolveAuthStateInitializer]);

    app.router(
      new Router({
        baseUrl: import.meta.env['BASE_URL'],
        routes: [
          new Route({
            layouts: [BaseLayout],
            routes: [
              new Route({
                path: '/sign-in',
                canMatch: [
                  RequireAnonymousSessionPolicy.configure().onFail(
                    Router.redirectToSaved({
                      fallback: '/',
                      replace: true,
                    }),
                  ),
                ],
                load: () => import('@page/sign-in'),
              }),
            ],
          }),
          new Route({
            canMatch: [
              RequireAuthenticatedSessionPolicy.configure().onFail(
                Router.redirectTo('/sign-in', {
                  replace: true,
                  saveCurrentLocation: true,
                }),
              ),
            ],
            layouts: [NavigateLayout],
            routes: [
              new Route({
                load: () => import('@page/dashboard'),
              }),
              new Route({
                path: '/shops',
                load: () => import('@page/shop'),
              }),
              new Route({
                path: '/products',
                routes: [
                  new Route({
                    load: () => import('@page/products'),
                  }),
                  new Route({
                    path: '/create',
                    load: () => import('@page/product-modify'),
                  }),
                  new Route({
                    path: '/:uuid',
                    load: () => import('@page/product-modify'),
                  }),
                ],
              }),
              new Route({
                path: '/store',
                frames: [StoreModifyFrame],
                routes: [
                  new Route({
                    load: () => import('@page/store'),
                  }),
                  new Route({
                    path: '/create',
                    load: () => import('@page/store-modify'),
                  }),
                  new Route({
                    path: '/:uuid',
                    load: () => import('@page/store-modify'),
                  }),
                ],
              }),
              new Route({
                path: '/brands',
                frames: [BrandModifyFrame],
                load: () => import('@page/brands'),
              }),
              new Route({
                path: '/categories',
                load: () => import('@page/categories'),
              }),
              new Route({
                path: '/units',
                load: () => import('@page/units'),
              }),
              new Route({
                path: '/properties',
                load: () => import('@page/properties'),
              }),
            ],
          }),
        ],
      }),
    );
  }
}
