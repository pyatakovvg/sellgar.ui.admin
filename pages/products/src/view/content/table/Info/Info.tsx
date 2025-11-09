import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {}

export const Info: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <p>{props.children}</p>
      </Typography>
    </div>
  );
};
