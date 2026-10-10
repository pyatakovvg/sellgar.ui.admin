import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route, Router } from '@sellgar/app/react';

import { NavigateLayout } from '@layout/navigate';

import { ShopRouting } from './frames/shop/shop.routing.ts';

import { RequireAuthenticatedSessionPolicy } from '../../../policies';

export const PrivateRoutes = (): Route[] => {
  return [
    new Route({
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
        new Route({
          token: Tokens.DashboardRoute,
          load: () => import('@page/dashboard'),
        }),
        new Route({
          token: Tokens.ShopsRoute,
          address: segments('shops'),
          load: () => import('@page/shops'),
          routing: [ShopRouting],
        }),
        new Route({
          address: segments('products'),
          load: () => import('@page/products'),
          token: Tokens.ProductsRoute,
          routes: [
            new Route({
              token: Tokens.ProductCreateRoute,
              address: segments('create'),
              load: () => import('@page/product-modify'),
            }),
            new Route({
              token: Tokens.ProductModifyRoute,
              address: segments(param('uuid')),
              load: () => import('@page/product-modify'),
            }),
          ],
        }),
        new Route({
          address: segments('templates'),
          load: () => import('@page/templates'),
          token: Tokens.TemplatesRoute,
          routes: [
            new Route({
              token: Tokens.TemplateCreateRoute,
              address: segments('create'),
              load: () => import('@page/template-modify'),
            }),
            new Route({
              token: Tokens.TemplateModifyRoute,
              address: segments(param('uuid')),
              load: () => import('@page/template-modify'),
            }),
          ],
        }),
        new Route({
          token: Tokens.StoreRoute,
          address: segments('store'),
          load: () => import('@page/store'),
          routing: [createStoreRouting(), createStoreInventoryRouting()],
        }),
        new Route({
          token: Tokens.BrandsRoute,
          address: segments('brands'),
          load: () => import('@page/brands'),
          routing: [createBrandRouting()],
        }),
        new Route({
          token: Tokens.CategoriesRoute,
          address: segments('categories'),
          load: () => import('@page/categories'),
          routing: [createCategoryRouting()],
        }),
        new Route({
          token: Tokens.UnitsRoute,
          address: segments('units'),
          load: () => import('@page/units'),
          routing: [createUnitRouting()],
        }),
        new Route({
          token: Tokens.PropertiesRoute,
          address: segments('properties'),
          load: () => import('@page/properties'),
          routing: [createPropertyRouting()],
        }),
      ],
    }),
  ];
};

const createStoreRouting = (): Router => {
  return createModifyRouting([
    new Route({
      token: Tokens.StoreCreateRoute,
      address: segments('store'),
      load: () => import('@frame/store-modify'),
    }),
    new Route({
      token: Tokens.StoreModifyRoute,
      address: segments('store', param('uuid')),
      load: () => import('@frame/store-modify'),
    }),
  ]);
};

const createStoreInventoryRouting = (): Router => {
  return new Router({
    routes: [
      new Route({
        token: Tokens.StoreInventoryRoute,
        address: segments('store-inventory', param('storeProductUuid'), param('offerUuid')),
        load: () => import('@frame/store-inventory'),
      }),
    ],
  });
};

const createBrandRouting = (): Router => {
  return createModifyRouting([
    new Route({
      token: Tokens.BrandCreateRoute,
      address: segments('brand'),
      load: () => import('@frame/brand-modify'),
    }),
    new Route({
      token: Tokens.BrandModifyRoute,
      address: segments('brand', param('code')),
      load: () => import('@frame/brand-modify'),
    }),
  ]);
};

const createCategoryRouting = (): Router => {
  return createModifyRouting([
    new Route({
      token: Tokens.CategoryCreateRoute,
      address: segments('category'),
      load: () => import('@frame/category-modify'),
    }),
    new Route({
      token: Tokens.CategoryModifyRoute,
      address: segments('category', param('uuid')),
      load: () => import('@frame/category-modify'),
    }),
  ]);
};

const createUnitRouting = (): Router => {
  return createModifyRouting([
    new Route({ token: Tokens.UnitCreateRoute, address: segments('unit'), load: () => import('@frame/unit-modify') }),
    new Route({
      token: Tokens.UnitModifyRoute,
      address: segments('unit', param('code')),
      load: () => import('@frame/unit-modify'),
    }),
  ]);
};

const createPropertyRouting = (): Router => {
  return createModifyRouting([
    new Route({
      token: Tokens.PropertyCreateRoute,
      address: segments('property'),
      load: () => import('@frame/property-modify'),
    }),
    new Route({
      token: Tokens.PropertyModifyRoute,
      address: segments('property', param('code')),
      load: () => import('@frame/property-modify'),
    }),
  ]);
};

const createModifyRouting = (routes: readonly Route[]): Router => {
  return new Router({ routes });
};
