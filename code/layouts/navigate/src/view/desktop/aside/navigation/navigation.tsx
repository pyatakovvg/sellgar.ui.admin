import React from 'react';

import { Sidebar, Typography } from '@sellgar/kit';
import {
  ArchiveLineIcon,
  CopyrightLineIcon,
  EqualizerLineIcon,
  FileList3LineIcon,
  NodeTreeIcon,
  RulerLineIcon,
  ShoppingBag3LineIcon,
  ShoppingCartLineIcon,
  StoreLineIcon,
} from '@sellgar/kit/icons';

import {
  BrandsRoute,
  CategoriesRoute,
  CartsRoute,
  ProductsRoute,
  PropertiesRoute,
  ShopsRoute,
  StoreRoute,
  TemplatesRoute,
  UnitsRoute,
} from '@library/route-tokens';

import { NavigationItem } from './navigation-item';

import s from './default.module.css';

export const Navigation: React.FC = () => {
  return (
    <Sidebar.Middle>
      <nav aria-label={'Основная навигация'}>
        <Sidebar.Block>
          <Sidebar.Additional>
            <Typography size={'caption-m'} weight={'medium'}>
              <p className={s.title}>Каталог</p>
            </Typography>
          </Sidebar.Additional>
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
            navigation={(navigate) => navigate.to(CategoriesRoute)}
            icon={<NodeTreeIcon />}
            caption={'Категории'}
          />
        </Sidebar.Block>

        <Sidebar.Block>
          <Sidebar.Additional>
            <Typography size={'caption-m'} weight={'medium'}>
              <p className={s.title}>Операции</p>
            </Typography>
          </Sidebar.Additional>
          <NavigationItem
            navigation={(navigate) => navigate.to(ShopsRoute)}
            icon={<StoreLineIcon />}
            caption={'Магазины'}
          />
          <NavigationItem
            navigation={(navigate) => navigate.to(StoreRoute)}
            icon={<ArchiveLineIcon />}
            caption={'Склад'}
          />
          <NavigationItem
            navigation={(navigate) => navigate.to(CartsRoute)}
            icon={<ShoppingCartLineIcon />}
            caption={'Корзины'}
          />
        </Sidebar.Block>

        <Sidebar.Block>
          <Sidebar.Additional>
            <Typography size={'caption-m'} weight={'medium'}>
              <p className={s.title}>Справочники</p>
            </Typography>
          </Sidebar.Additional>
          <NavigationItem
            navigation={(navigate) => navigate.to(BrandsRoute)}
            icon={<CopyrightLineIcon />}
            caption={'Бренды'}
          />
          <NavigationItem
            navigation={(navigate) => navigate.to(UnitsRoute)}
            icon={<RulerLineIcon />}
            caption={'Единицы измерения'}
          />
          <NavigationItem
            navigation={(navigate) => navigate.to(PropertiesRoute)}
            icon={<EqualizerLineIcon />}
            caption={'Свойства'}
          />
        </Sidebar.Block>
      </nav>
    </Sidebar.Middle>
  );
};
