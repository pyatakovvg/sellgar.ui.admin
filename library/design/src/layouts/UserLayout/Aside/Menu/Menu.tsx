import React from 'react';
import { NavLink } from 'react-router-dom';

import { Item } from './Item';

import s from './default.module.scss';

export const Menu: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className={s.wrapper}>
      <NavLink className={s.item} to={'/users'} end={true}>
        {({ isActive }) => <Item isActive={isActive}>Пользователи</Item>}
      </NavLink>
      <NavLink className={s.item} to={'/users/options'}>
        {({ isActive }) => <Item isActive={isActive}>Параметры</Item>}
      </NavLink>
    </div>
  );
};
