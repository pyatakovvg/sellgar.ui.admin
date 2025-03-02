import { Sidebar, MenuItem } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

export const Navigate = () => {
  return (
    <Sidebar>
      <Sidebar.Middle>
        <Sidebar.Cell>
          <NavLink className={s.link} to={'/'}>
            {({ isActive }) => <MenuItem leadicon={'home-2-line'} caption={'Главная'} active={isActive} />}
          </NavLink>
        </Sidebar.Cell>
        <Sidebar.Cell>
          <NavLink className={s.link} to={'/brands'}>
            {({ isActive }) => <MenuItem leadicon={'reactjs-line'} caption={'Бренды'} active={isActive} />}
          </NavLink>
        </Sidebar.Cell>
        <Sidebar.Cell>
          <NavLink className={s.link} to={'/categories'}>
            {({ isActive }) => <MenuItem leadicon={'reactjs-line'} caption={'Категории'} active={isActive} />}
          </NavLink>
        </Sidebar.Cell>
        <Sidebar.Cell>
          <NavLink className={s.link} to={'/units'}>
            {({ isActive }) => <MenuItem leadicon={'reactjs-line'} caption={'Единица измерения'} active={isActive} />}
          </NavLink>
        </Sidebar.Cell>
        <Sidebar.Cell>
          <NavLink className={s.link} to={'/properties'}>
            {({ isActive }) => <MenuItem leadicon={'reactjs-line'} caption={'Свойства'} active={isActive} />}
          </NavLink>
        </Sidebar.Cell>
        <Sidebar.Cell>
          <NavLink className={s.link} to={'/products'}>
            {({ isActive }) => <MenuItem leadicon={'reactjs-line'} caption={'Товары'} active={isActive} />}
          </NavLink>
        </Sidebar.Cell>
        <Sidebar.Cell>
          <NavLink className={s.link} to={'/files'}>
            {({ isActive }) => <MenuItem leadicon={'reactjs-line'} caption={'Файлы'} active={isActive} />}
          </NavLink>
        </Sidebar.Cell>
      </Sidebar.Middle>
      <Sidebar.Bottom>
        <Sidebar.Cell>
          <NavLink className={s.link} to={'/settings'}>
            {({ isActive }) => <MenuItem leadicon={'settings-3-line'} caption={'Настройки'} active={isActive} />}
          </NavLink>
        </Sidebar.Cell>
      </Sidebar.Bottom>
    </Sidebar>
  );
};
