import { Sidebar, MenuItem, User } from '@sellgar/kit';
import {
  CopyrightLineIcon,
  DashboardLineIcon,
  Home2LineIcon,
  LinksLineIcon,
  ShoppingBag3LineIcon,
  StockLineIcon,
  StoreLineIcon,
  UnsplashLineIcon,
} from '@sellgar/kit/icons';
import { ProfileEntity } from '@library/domain';
import {
  BrandsRoute,
  CategoriesRoute,
  DashboardRoute,
  ProductsRoute,
  PropertiesRoute,
  ShopsRoute,
  StoreRoute,
  UnitsRoute,
} from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { ApplicationStoreInterface, type NavigationRequestFactory } from '@sellgar/app';
import { NavLink, WidgetHost } from '@sellgar/app/react';
import { LogoutWidget } from '@widget/logout';
import { ThemeWidget } from '@widget/theme';

import React from 'react';
import s from './default.module.scss';

interface NavigationItemProps {
  readonly caption: string;
  readonly icon: React.ReactNode;
  readonly navigation: NavigationRequestFactory;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ caption, icon, navigation }) => {
  return (
    <Sidebar.Cell>
      <NavLink navigation={navigation}>
        {({ anchor, isActive, isPending }) => (
          <a {...anchor} className={s.link}>
            <MenuItem leadIcon={icon} caption={caption} isActive={isActive} isPending={isPending} />
          </a>
        )}
      </NavLink>
    </Sidebar.Cell>
  );
};

export const Aside = () => {
  const dataStore = App.useDependency(ApplicationStoreInterface);
  const profile = dataStore.get(ProfileEntity);

  return (
    <div className={s.wrapper}>
      <Sidebar open={true}>
        <Sidebar.Top>
          <Sidebar.Block>
            <Sidebar.Cell>
              <User name={'Профиль'} caption={profile?.user.login} />
            </Sidebar.Cell>
          </Sidebar.Block>
        </Sidebar.Top>
        <Sidebar.Divider />
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

        <Sidebar.Bottom>
          <WidgetHost token={ThemeWidget} props={{}} />
          <WidgetHost token={LogoutWidget} />
        </Sidebar.Bottom>
      </Sidebar>
    </div>
  );
};
