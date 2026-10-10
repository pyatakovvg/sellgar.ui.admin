import React from 'react';

import { Login } from './login';
import { Password } from './password';

import s from './default.module.scss';

export const Fields: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <Login />
      </div>
      <div className={s.field}>
        <Password />
      </div>
    </div>
  );
};
