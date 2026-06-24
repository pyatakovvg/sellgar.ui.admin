import { Sidebar, MenuItem, User } from '@sellgar/kit';
import {
  CopyrightLineIcon,
  DashboardLineIcon,
  FileTextLineIcon,
  Home2LineIcon,
  LinksLineIcon,
  Settings3LineIcon,
  ShoppingBag3LineIcon,
  StockLineIcon,
  StoreLineIcon,
  UnsplashLineIcon,
} from '@sellgar/kit/icons';
import { ApplicationStoreInterface, useDependency } from '@tiyn/app';
import { ProfileEntity } from '@library/domain';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

interface NavigationItemProps {
  readonly caption: string;
  readonly icon: React.ReactNode;
  readonly to: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ caption, icon, to }) => {
  return (
    <Sidebar.Cell>
      <NavLink className={s.link} to={to} viewTransition={true}>
        {({ isActive, isPending }) => (
          <MenuItem leadIcon={icon} caption={caption} isActive={isActive} isPending={isPending} />
        )}
      </NavLink>
    </Sidebar.Cell>
  );
};

export const Aside = () => {
  const dataStore = useDependency(ApplicationStoreInterface);
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
            <NavigationItem to={'/'} icon={<Home2LineIcon />} caption={'Главная'} />
            <NavigationItem to={'/shops'} icon={<StoreLineIcon />} caption={'Магазины'} />
            <NavigationItem to={'/products'} icon={<ShoppingBag3LineIcon />} caption={'Товары'} />
            <NavigationItem to={'/store'} icon={<UnsplashLineIcon />} caption={'Склад'} />
          </Sidebar.Block>

          <Sidebar.Block>
            <Sidebar.Additional>Параметры</Sidebar.Additional>
            <NavigationItem to={'/brands'} icon={<CopyrightLineIcon />} caption={'Бренды'} />
            <NavigationItem to={'/categories'} icon={<DashboardLineIcon />} caption={'Категории'} />
            <NavigationItem to={'/units'} icon={<LinksLineIcon />} caption={'Единица измерения'} />
            <NavigationItem to={'/properties'} icon={<StockLineIcon />} caption={'Свойства'} />
          </Sidebar.Block>

          <Sidebar.Block>
            <Sidebar.Additional>Хранилище</Sidebar.Additional>
            <NavigationItem to={'/files'} icon={<FileTextLineIcon />} caption={'Файлы'} />
          </Sidebar.Block>
        </Sidebar.Middle>

        <Sidebar.Bottom>
          <NavigationItem to={'/settings'} icon={<Settings3LineIcon />} caption={'Настройки'} />
        </Sidebar.Bottom>
      </Sidebar>
    </div>
  );
};
