import React from 'react';
import { Outlet } from 'react-router-dom';

import s from './default.module.scss';

export const BaseLayout = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};
