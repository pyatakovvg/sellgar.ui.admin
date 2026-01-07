import { Typography, useCellData } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Category: React.FC = () => {
  const { data } = useCellData<StoreEntity>();

  if (!data.variant.product.category) {
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
        <p className={s.value}>{data.variant.product.category.name}</p>
      </Typography>
    </div>
  );
};
