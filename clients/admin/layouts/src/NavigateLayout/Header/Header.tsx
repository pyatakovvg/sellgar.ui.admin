import { Logotype } from '@admin/design';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.logotype}>
        <Logotype />
      </div>
    </div>
  );
};
