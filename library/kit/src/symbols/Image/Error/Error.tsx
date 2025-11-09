import { Icon } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Error = () => {
  return (
    <div className={s.wrapper}>
      <Icon icon={'close-line'} />
    </div>
  );
};
