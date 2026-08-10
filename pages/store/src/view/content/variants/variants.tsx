import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

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

const VariantsComponent: React.FC = () => {
  const { data } = Kit.useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{formatVariantCount(data.offers.length)}</p>
      </Typography>
    </div>
  );
};

export const Variants = App.reactive(VariantsComponent);
