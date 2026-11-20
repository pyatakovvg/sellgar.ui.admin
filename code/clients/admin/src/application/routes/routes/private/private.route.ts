import * as Tokens from '@library/route-tokens';
import { Route, Router } from '@sellgar/app/react';

import { NavigateLayout } from '@layout/navigate';

import { RequireAuthenticatedSessionPolicy } from '../../../policies';

import { shopsRoute } from './routes/shops';
import { templatesRoute } from './routes/templates';
import { productsRoute } from './routes/products';
import { storeRoute } from './routes/store';
import { cartsRoute } from './routes/carts';
import { brandsRoute } from './routes/brands';
import { categoriesRoute } from './routes/categories';
import { unitsRoute } from './routes/units';
import { propertiesRoute } from './routes/properties';

export const privateRoute = new Route({
  defaultTo: Router.firstAvailable(),
  canMatch: [
    RequireAuthenticatedSessionPolicy.configure().onFail(
      Router.redirectTo(Tokens.SignInRoute, {
        replace: true,
        saveCurrentLocation: true,
      }),
    ),
  ],
  layouts: [NavigateLayout],
  routes: [
    shopsRoute,
    templatesRoute,
    productsRoute,
    storeRoute,
    cartsRoute,
    brandsRoute,
    categoriesRoute,
    unitsRoute,
    propertiesRoute,
  ],
});
