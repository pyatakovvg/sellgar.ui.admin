import * as Tokens from '@library/route-tokens';
import { param, segments } from '@sellgar/app';
import { Route, Router } from '@sellgar/app/react';

import { NavigateLayout } from '@layout/navigate';

import { ShopRouting } from './frames/shop/shop.routing.ts';
import { BrandRouting } from './frames/brand/brand.routing.ts';
import { StoreRouting } from './frames/store/store.routing.ts';
import { UnitRouting } from './frames/unit/unit.routing.ts';
import { PropertyRouting } from './frames/property/property.routing.ts';

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
          load: () => import('@module/dashboard'),
        }),
        new Route({
          token: Tokens.ShopsRoute,
          address: segments('shops'),
          load: () => import('@module/shops'),
          routing: [ShopRouting],
        }),
        new Route({
          address: segments('products'),
          load: () => import('@module/products'),
          token: Tokens.ProductsRoute,
          routes: [
            new Route({
              token: Tokens.ProductCreateRoute,
              address: segments('create'),
              load: () => import('@module/product-modify'),
            }),
            new Route({
              token: Tokens.ProductModifyRoute,
              address: segments(param('uuid')),
              load: () => import('@module/product-modify'),
            }),
          ],
        }),
        new Route({
          address: segments('templates'),
          load: () => import('@module/templates'),
          token: Tokens.TemplatesRoute,
          routes: [
            new Route({
              token: Tokens.TemplateCreateRoute,
              address: segments('create'),
              load: () => import('@module/template-modify'),
            }),
            new Route({
              token: Tokens.TemplateModifyRoute,
              address: segments(param('uuid')),
              load: () => import('@module/template-modify'),
            }),
          ],
        }),
        new Route({
          token: Tokens.StoreRoute,
          address: segments('store'),
          load: () => import('@module/store'),
          routing: [StoreRouting, createStoreInventoryRouting()],
        }),
        new Route({
          token: Tokens.BrandsRoute,
          address: segments('brands'),
          load: () => import('@module/brands'),
          routing: [BrandRouting],
        }),
        new Route({
          token: Tokens.CategoriesRoute,
          address: segments('categories'),
          load: () => import('@module/categories'),
          routing: [createCategoryRouting()],
        }),
        new Route({
          token: Tokens.UnitsRoute,
          address: segments('units'),
          load: () => import('@module/units'),
          routing: [UnitRouting],
        }),
        new Route({
          token: Tokens.PropertiesRoute,
          address: segments('properties'),
          load: () => import('@module/properties'),
          routing: [PropertyRouting],
        }),
      ],
    }),
  ];
};

const createStoreInventoryRouting = (): Router => {
  return new Router({
    routes: [
      new Route({
        token: Tokens.StoreInventoryRoute,
        address: segments('store-inventory', param('storeProductUuid'), param('recordUuid')),
        load: () => import('@frame/store-inventory'),
      }),
    ],
  });
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

const createModifyRouting = (routes: readonly Route[]): Router => {
  return new Router({ routes });
};
