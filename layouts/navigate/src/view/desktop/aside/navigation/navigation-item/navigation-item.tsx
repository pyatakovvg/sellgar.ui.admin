import { MenuItem, Sidebar } from '@sellgar/kit';
import type { NavigationRequestFactory } from '@sellgar/app';
import { NavLink } from '@sellgar/app/react';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  readonly caption: string;
  readonly icon: React.ReactNode;
  readonly navigation: NavigationRequestFactory;
}

export const NavigationItem: React.FC<IProps> = (props) => {
  return (
    <Sidebar.Cell>
      <NavLink navigation={props.navigation}>
        {({ anchor, isActive, isPending }) => (
          <a {...anchor} className={s.wrapper}>
            <MenuItem leadIcon={props.icon} caption={props.caption} isActive={isActive} isPending={isPending} />
          </a>
        )}
      </NavLink>
    </Sidebar.Cell>
  );
};
