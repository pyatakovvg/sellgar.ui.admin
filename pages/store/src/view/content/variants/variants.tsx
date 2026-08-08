import { StoreProductEntity } from '@library/domain';
import { Typography, useCellData } from '@sellgar/kit';
import { reactive } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

const formatVariantCount = (count: number): string => {
  if (count === 0) {
    return 'Нет';
  }

  if (count === 1) {
    return '1 вариант';
  }

  return `${count} вариантов`;
};

export const Variants: React.FC = reactive(() => {
  const { data } = useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{formatVariantCount(data.offers.length)}</p>
      </Typography>
    </div>
  );
});
