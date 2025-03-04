import { Spinner } from '@library/kit';
import { Logotype } from '@admin/design';

import React from 'react';

import s from './default.module.scss';

export const Splash = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.spinner}>
          <Spinner />
        </div>
        <div className={s.logotype}>
          <Logotype />
        </div>
      </div>
    </div>
  );
};
