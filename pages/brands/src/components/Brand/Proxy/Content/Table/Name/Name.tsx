import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  deps: number;
}

export const Name: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper} style={{ marginLeft: props.deps * 24 }}>
      <Typography size={'caption-l'} weight={'semi-bold'}>
        <p>{props.children}</p>
      </Typography>
    </div>
  );
};
