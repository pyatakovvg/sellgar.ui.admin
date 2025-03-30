import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export interface IProps {
  data: any;
}

export const Empty: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>{props.children}</p>
      </Typography>
    </div>
  );
};
