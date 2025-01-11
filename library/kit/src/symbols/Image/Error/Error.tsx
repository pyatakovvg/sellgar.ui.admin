import { Icon } from '../../Icon';

import React from 'react';

import s from './default.module.scss';

export const Error = () => {
  return (
    <div className={s.wrapper}>
      <Icon icon={'error'} size={32} />
    </div>
  );
};
