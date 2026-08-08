import { Typography, useCellData } from '@sellgar/kit';
import { StoreProductEntity } from '@library/domain';
import { reactive } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

export const Category: React.FC = reactive(() => {
  const { data } = useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{data.status}</p>
      </Typography>
    </div>
  );
});
