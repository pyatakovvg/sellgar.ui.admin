import { Typography, useCellData } from '@sellgar/kit';
import { ProductEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Category: React.FC = () => {
  const { data } = useCellData<ProductEntity>();

  if (!data.category) {
    return (
      <div className={s.wrapper}>
        <Typography size={'caption-m'} weight={'semi-bold'}>
          <p className={s.value}>---</p>
        </Typography>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{data.category.name}</p>
      </Typography>
    </div>
  );
};
