import { Typography } from '@sellgar/kit';
import { useCellData } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { deps, data } = useCellData();

  return (
    <div className={s.wrapper} style={{ padding: `0 0 0 var(--numbers-${deps * 12})` }}>
      <div className={s.expand}>{/*<Expand />*/}</div>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'semi-bold'}>
          <p className={s.text}>{data.name}</p>
        </Typography>
      </div>
    </div>
  );
};
