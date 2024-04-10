import React from 'react';
import { NavLink } from 'react-router-dom';

import { Item } from './Item';

import s from './default.module.scss';

export const Aside: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <NavLink className={s.item} to={'/shops'} caseSensitive={true} end={true}>
        {({ isActive }) => <Item isActive={isActive}>Магазины</Item>}
      </NavLink>
      <NavLink className={s.item} to={'/shops/options'}>
        {({ isActive }) => <Item isActive={isActive}>Настройка</Item>}
      </NavLink>
    </div>
  );
};
