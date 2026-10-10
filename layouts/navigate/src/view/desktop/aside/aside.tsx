import { Sidebar } from '@sellgar/kit';

import React from 'react';

import { Actions } from './actions';
import { Navigation } from './navigation';
import { Profile } from './profile';

import s from './default.module.scss';

export const Aside: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Sidebar open={true}>
        <Profile />
        <Sidebar.Divider />
        <Navigation />
        <Actions />
      </Sidebar>
    </div>
  );
};
