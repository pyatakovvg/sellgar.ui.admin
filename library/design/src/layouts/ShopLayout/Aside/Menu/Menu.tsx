import { Icon } from '@library/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import { Item } from './Item';

import s from './default.module.scss';

export const Menu: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className={s.wrapper}>
      <NavLink className={s.item} to={'/shops'}>
        {({ isActive }) => <Item isActive={isActive}>Магазины</Item>}
      </NavLink>
      <NavLink className={s.item} to={'/users'}>
        {({ isActive }) => <Item isActive={isActive}>Настройка</Item>}
      </NavLink>
    </div>
  );
};
