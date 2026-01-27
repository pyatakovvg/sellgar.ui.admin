import { Typography } from '@sellgar/kit';
import { useCellData } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'semi-bold'}>
        <p className={s.name}>{data.name}</p>
      </Typography>
      {data.unit && (
        <Typography size={'caption-m'} weight={'semi-bold'}>
          <p className={s.unit}>[{data.unit.name}]</p>
        </Typography>
      )}
    </div>
  );
};
