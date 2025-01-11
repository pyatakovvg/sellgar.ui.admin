import { Spinner } from '../../Spinner';

import React from 'react';

import s from './default.module.scss';

export const Loading = () => {
  return (
    <div className={s.wrapper}>
      <Spinner variant={'CIRCLE'} />
    </div>
  );
};
