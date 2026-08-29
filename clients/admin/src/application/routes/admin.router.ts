import {
  BrandCreateRoute,
  BrandModifyRoute,
  BrandsRoute,
  CategoriesRoute,
  CategoryCreateRoute,
  CategoryModifyRoute,
  DashboardRoute,
  ProductCreateRoute,
  ProductModifyRoute,
  ProductsRoute,
  PropertiesRoute,
  PropertyCreateRoute,
  PropertyModifyRoute,
  ShopCreateRoute,
  ShopModifyRoute,
  ShopsRoute,
  SignInRoute,
  StoreCreateRoute,
  StoreInventoryRoute,
  StoreModifyRoute,
  StoreRoute,
  UnitCreateRoute,
  UnitModifyRoute,
  UnitsRoute,
} from '@library/route-tokens';
import { param, segments } from '@sellgar/app-v2';
import { Route, Router } from '@sellgar/app-v2/react';

import { BaseLayout } from '@layout/base';
import { NavigateLayout } from '@layout/navigate';

import { RequireAnonymousSessionPolicy, RequireAuthenticatedSessionPolicy } from '../policies';

export const createAdminRouter = (): Router => {
  return new Router({
    routes: [
      new Route({
        layouts: [BaseLayout],
        routes: [
          new Route({
            token: SignInRoute,
            address: segments('sign-in'),
            canMatch: [
              RequireAnonymousSessionPolicy.configure().onFail(Router.redirectToSaved({ replace: true })),
            ],
            load: () => import('@page/sign-in'),
          }),
        ],
      }),
      new Route({
        canMatch: [
          RequireAuthenticatedSessionPolicy.configure().onFail(
            Router.redirectTo(SignInRoute, {
              replace: true,
              saveCurrentLocation: true,
            }),
          ),
        ],
        layouts: [NavigateLayout],
        routes: [
          new Route({
            token: DashboardRoute,
            load: () => import('@page/dashboard'),
          }),
          new Route({
            token: ShopsRoute,
            address: segments('shops'),
            load: () => import('@page/shops'),
            routing: [createShopRouting()],
          }),
          new Route({
            address: segments('products'),
            routes: [
              new Route({
                token: ProductsRoute,
                load: () => import('@page/products'),
              }),
              new Route({
                token: ProductCreateRoute,
                address: segments('create'),
                load: () => import('@page/product-modify'),
              }),
              new Route({
                token: ProductModifyRoute,
                address: segments(param('uuid')),
                load: () => import('@page/product-modify'),
              }),
            ],
          }),
          new Route({
            token: StoreRoute,
            address: segments('store'),
            load: () => import('@page/store'),
            routing: [createStoreRouting(), createStoreInventoryRouting()],
          }),
          new Route({
            token: BrandsRoute,
            address: segments('brands'),
            load: () => import('@page/brands'),
            routing: [createBrandRouting()],
          }),
          new Route({
            token: CategoriesRoute,
            address: segments('categories'),
            load: () => import('@page/categories'),
            routing: [createCategoryRouting()],
          }),
          new Route({
            token: UnitsRoute,
            address: segments('units'),
            load: () => import('@page/units'),
            routing: [createUnitRouting()],
          }),
          new Route({
            token: PropertiesRoute,
            address: segments('properties'),
            load: () => import('@page/properties'),
            routing: [createPropertyRouting()],
          }),
        ],
      }),
    ],
  });
};

const createShopRouting = (): Router => {
  return createModifyRouting([
    new Route({ token: ShopCreateRoute, address: segments('shop'), load: () => import('@frame/shop-modify') }),
    new Route({
      token: ShopModifyRoute,
      address: segments('shop', param('uuid')),
      load: () => import('@frame/shop-modify'),
    }),
  ]);
};

const createStoreRouting = (): Router => {
  return createModifyRouting([
    new Route({ token: StoreCreateRoute, address: segments('store'), load: () => import('@frame/store-modify') }),
    new Route({
      token: StoreModifyRoute,
      address: segments('store', param('uuid')),
      load: () => import('@frame/store-modify'),
    }),
  ]);
};

const createStoreInventoryRouting = (): Router => {
  return new Router({
    routes: [
      new Route({
        token: StoreInventoryRoute,
        address: segments('store-inventory', param('storeProductUuid'), param('offerUuid')),
        load: () => import('@frame/store-inventory'),
      }),
    ],
  });
};

const createBrandRouting = (): Router => {
  return createModifyRouting([
    new Route({ token: BrandCreateRoute, address: segments('brand'), load: () => import('@frame/brand-modify') }),
    new Route({
      token: BrandModifyRoute,
      address: segments('brand', param('uuid')),
      load: () => import('@frame/brand-modify'),
    }),
  ]);
};

const createCategoryRouting = (): Router => {
  return createModifyRouting([
    new Route({
      token: CategoryCreateRoute,
      address: segments('category'),
      load: () => import('@frame/category-modify'),
    }),
    new Route({
      token: CategoryModifyRoute,
      address: segments('category', param('uuid')),
      load: () => import('@frame/category-modify'),
    }),
  ]);
};

const createUnitRouting = (): Router => {
  return createModifyRouting([
    new Route({ token: UnitCreateRoute, address: segments('unit'), load: () => import('@frame/unit-modify') }),
    new Route({
      token: UnitModifyRoute,
      address: segments('unit', param('uuid')),
      load: () => import('@frame/unit-modify'),
    }),
  ]);
};

const createPropertyRouting = (): Router => {
  return createModifyRouting([
    new Route({
      token: PropertyCreateRoute,
      address: segments('property'),
      load: () => import('@frame/property-modify'),
    }),
    new Route({
      token: PropertyModifyRoute,
      address: segments('property', param('uuid')),
      load: () => import('@frame/property-modify'),
    }),
  ]);
};

const createModifyRouting = (routes: readonly Route[]): Router => {
  return new Router({ routes });
};
