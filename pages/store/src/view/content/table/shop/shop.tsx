import { Typography, useCellData } from '@sellgar/kit';
import { StoreProductEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Shop: React.FC = () => {
  const { data } = useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{data.shopSnapshot?.name ?? data.shopUuid}</p>
      </Typography>
    </div>
  );
};
