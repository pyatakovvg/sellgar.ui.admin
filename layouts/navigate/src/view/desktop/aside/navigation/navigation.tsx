import { Sidebar } from '@sellgar/kit';
import {
  CopyrightLineIcon,
  DashboardLineIcon,
  Home2LineIcon,
  LinksLineIcon,
  ShoppingBag3LineIcon,
  FileList3LineIcon,
  StockLineIcon,
  StoreLineIcon,
  UnsplashLineIcon,
} from '@sellgar/kit/icons';
import {
  BrandsRoute,
  CategoriesRoute,
  DashboardRoute,
  ProductsRoute,
  PropertiesRoute,
  ShopsRoute,
  StoreRoute,
  TemplatesRoute,
  UnitsRoute,
} from '@library/route-tokens';

import React from 'react';

import { NavigationItem } from './navigation-item';

export const Navigation: React.FC = () => {
  return (
    <Sidebar.Middle>
      <Sidebar.Block>
        <Sidebar.Additional>Компания</Sidebar.Additional>
        <NavigationItem
          navigation={(navigate) => navigate.to(DashboardRoute)}
          icon={<Home2LineIcon />}
          caption={'Главная'}
        />
        <NavigationItem
          navigation={(navigate) => navigate.to(ShopsRoute)}
          icon={<StoreLineIcon />}
          caption={'Магазины'}
        />
        <NavigationItem
          navigation={(navigate) => navigate.to(ProductsRoute)}
          icon={<ShoppingBag3LineIcon />}
          caption={'Товары'}
        />
        <NavigationItem
          navigation={(navigate) => navigate.to(TemplatesRoute)}
          icon={<FileList3LineIcon />}
          caption={'Шаблоны'}
        />
        <NavigationItem
          navigation={(navigate) => navigate.to(StoreRoute)}
          icon={<UnsplashLineIcon />}
          caption={'Склад'}
        />
      </Sidebar.Block>

      <Sidebar.Block>
        <Sidebar.Additional>Параметры</Sidebar.Additional>
        <NavigationItem
          navigation={(navigate) => navigate.to(BrandsRoute)}
          icon={<CopyrightLineIcon />}
          caption={'Бренды'}
        />
        <NavigationItem
          navigation={(navigate) => navigate.to(CategoriesRoute)}
          icon={<DashboardLineIcon />}
          caption={'Категории'}
        />
        <NavigationItem
          navigation={(navigate) => navigate.to(UnitsRoute)}
          icon={<LinksLineIcon />}
          caption={'Единица измерения'}
        />
        <NavigationItem
          navigation={(navigate) => navigate.to(PropertiesRoute)}
          icon={<StockLineIcon />}
          caption={'Свойства'}
        />
      </Sidebar.Block>
    </Sidebar.Middle>
  );
};
