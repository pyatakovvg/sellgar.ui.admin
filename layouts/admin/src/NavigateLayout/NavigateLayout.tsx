import { Breadcrumbs } from '@library/breadcrumbs';

import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Navigate } from './Navigate';

import s from './default.module.scss';

export const NavigateLayout = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.context}>
        <div className={s.aside}>
          <Navigate />
        </div>
        <div className={s.content}>
          <div className={s.breadcrumbs}>
            <Breadcrumbs />
          </div>
          <div className={s.outlet}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
