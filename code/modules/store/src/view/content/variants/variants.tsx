import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.css';

const formatVariantCount = (count: number): string => {
  if (count === 0) {
    return 'Нет';
  }

  if (count === 1) {
    return '1 вариант';
  }

  return `${count} вариантов`;
};

interface IProps {
  product: StoreProductEntity;
}

const VariantsComponent: React.FC<IProps> = (props) => {
  const offers = props.product.offers.filter((offer) => offer.variantSnapshot?.status !== 'archived');

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{formatVariantCount(offers.length)}</p>
      </Typography>
    </div>
  );
};

export const Variants = App.reactive(VariantsComponent);
