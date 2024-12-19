import { Underlay } from '@library/kit';
import { Logotype } from '@admin/design';

import React from 'react';
import { Outlet } from 'react-router-dom';

import s from './default.module.scss';

export const BaseLayout = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Underlay variant={'top'}>
          <div className={s.logotype}>
            <Logotype />
          </div>
        </Underlay>
      </div>

      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};
