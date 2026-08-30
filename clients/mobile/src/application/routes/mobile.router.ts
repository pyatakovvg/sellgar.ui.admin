import { BrandCreateRoute, BrandsRoute, ProductModifyRoute, ProductsRoute, SignInRoute } from '@library/route-tokens';
import { param, segments } from '@sellgar/app-v2';
import { Route, Router } from '@sellgar/app-v2/native';

import { MainTabsLayout } from '../../layouts/main-tabs/src';
import { DrawerShell } from '../../shells/drawer/src';
import { RequireAnonymousSessionPolicy, RequireAuthenticatedSessionPolicy } from '../policies';

export const createMobileRouter = (): Router => {
  return new Router({
    routes: [createAnonymousBranch(), createAuthenticatedBranch()],
  });
};

const createAnonymousBranch = (): Route => {
  return new Route({
    canMatch: [RequireAnonymousSessionPolicy.configure().onFail(Router.redirectToSaved({ replace: true }))],
    defaultTo: SignInRoute,
    routes: [
      new Route({
        address: segments('sign-in'),
        token: SignInRoute,
        load: () => import('../../pages/sign-in/src'),
      }),
    ],
  });
};

const createAuthenticatedBranch = (): Route => {
  const brandsDrawer = new Router({
    shell: DrawerShell,
    routes: [
      new Route({
        address: segments('create'),
        token: BrandCreateRoute,
        load: () => import('../../pages/brand-create/src'),
      }),
    ],
  });

  return new Route({
    canMatch: [
      RequireAuthenticatedSessionPolicy.configure().onFail(
        Router.redirectTo(SignInRoute, {
          replace: true,
          saveCurrentLocation: true,
        }),
      ),
    ],
    defaultTo: ProductsRoute,
    layouts: [MainTabsLayout],
    routes: [
      new Route({
        address: segments('products'),
        token: ProductsRoute,
        load: () => import('../../pages/products/src'),
        routes: [
          new Route({
            address: segments(param('uuid')),
            token: ProductModifyRoute,
            load: () => import('../../pages/product-detail/src'),
          }),
        ],
      }),
      new Route({
        address: segments('brands'),
        token: BrandsRoute,
        load: () => import('../../pages/brands/src'),
        routing: [brandsDrawer],
      }),
    ],
  });
};
