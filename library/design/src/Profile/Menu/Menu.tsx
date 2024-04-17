import React from 'react';

import { SignOut } from './SignOut';
import { Settings } from './Settings';

import s from './default.module.scss';

export const Menu: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.line}>
          <Settings />
        </div>
      </div>
      <div className={s.control}>
        <div className={s.line}>
          <SignOut />
        </div>
      </div>
    </div>
  );
};
