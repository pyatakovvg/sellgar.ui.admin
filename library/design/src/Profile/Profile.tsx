import { DropDown } from '@library/kit';

import React from 'react';

import { Menu } from './Menu';
import { Person } from './Person';

import s from './default.module.scss';

export const Profile: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <DropDown>
        <DropDown.Content>
          <Person />
        </DropDown.Content>
        <DropDown.List>
          <Menu />
        </DropDown.List>
      </DropDown>
    </div>
  );
};
