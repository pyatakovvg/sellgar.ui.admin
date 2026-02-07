import { Typography, useCellData } from '@sellgar/kit';
import { BrandEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData<BrandEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>{data.name}</p>
      </Typography>
    </div>
  );
};
