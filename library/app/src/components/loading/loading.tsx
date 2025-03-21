import { Spinner } from '@sellgar/kit';
import { Logotype } from '@library/design';

import React from 'react';

import s from './default.module.scss';

export const Loading = () => {
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
