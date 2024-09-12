import React from 'react';
import { NavLink } from 'react-router-dom';

import { type CustomItemProps } from '../Menu/CustomItem';

import cn from 'classnames';
import s from './default.module.scss';

interface NavItemProps extends CustomItemProps {
  href: string;
}

export const NavItem: React.FC<React.PropsWithChildren<NavItemProps>> = (props) => {
  return (
    <NavLink to={props.href}>
      {({ isActive }) => {
        return (
          <div
            className={cn(s.wrapper, {
              [s['is-active']]: isActive,
            })}
          >
            {props.children}
          </div>
        );
      }}
    </NavLink>
  );
};
