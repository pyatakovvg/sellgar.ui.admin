import React from 'react';

import { Typography } from '@sellgar/kit';

import s from './default.module.scss';

export const Title: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>{props.children}</p>
      </Typography>
    </div>
  );
};
