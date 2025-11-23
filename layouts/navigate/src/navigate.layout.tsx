import { Scrollbar } from '@sellgar/kit';

import React from 'react';

import { Header } from './Header';
import { Navigate } from './Navigate';

import s from './default.module.scss';

export const NavigateLayout: React.FC<React.PropsWithChildren> = (props) => {
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
          <Scrollbar className={s.outlet}>{props.children}</Scrollbar>
        </div>
      </div>
    </div>
  );
};
