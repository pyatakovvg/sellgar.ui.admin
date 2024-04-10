import { Icon } from '@library/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import { Item } from './Item';

import s from './default.module.scss';

interface IProps {
  isFull: boolean;
}

export const AsideMenu = (props: React.PropsWithChildren<IProps>) => {
  return (
    <div className={s.wrapper}>
      <NavLink className={s.item} to={'/stock'}>
        {({ isActive }) => (
          <Item isActive={isActive} icon={<Icon icon={'stack-overflow'} weight={'brands'} />} isFull={props.isFull}>
            Склад
          </Item>
        )}
      </NavLink>
      <NavLink className={s.item} to={'/products'}>
        {({ isActive }) => (
          <Item isActive={isActive} icon={<Icon icon={'box'} />} isFull={props.isFull}>
            Товары
          </Item>
        )}
      </NavLink>
      <NavLink className={s.item} to={'/shops'}>
        {({ isActive }) => (
          <Item isActive={isActive} icon={<Icon icon={'shop'} />} isFull={props.isFull}>
            Магазины
          </Item>
        )}
      </NavLink>
      <NavLink className={s.item} to={'/users'}>
        {({ isActive }) => (
          <Item isActive={isActive} icon={<Icon icon={'users'} />} isFull={props.isFull}>
            Пользователи
          </Item>
        )}
      </NavLink>
    </div>
  );
};
