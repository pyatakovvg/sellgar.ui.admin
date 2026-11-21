import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';
import { amountFormat } from '@utils/format';

import React from 'react';

import s from './default.module.css';

interface IProps {
  offer: StoreOfferEntity;
}

const PriceComponent: React.FC<IProps> = (props) => {
  const priceRange = props.offer.priceRange;
  const value = priceRange
    ? [...new Set([priceRange.min, priceRange.max])]
        .map((value) => amountFormat(value, { hundredthsAfterDecimal: true }))
        .join(' ... ')
    : '---';

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'bold'}>
        <p className={s.price}>{value}</p>
      </Typography>
      {priceRange ? (
        <Typography size={'caption-s'} weight={'medium'}>
          <span className={s.currency}>{priceRange.currency.value}</span>
        </Typography>
      ) : null}
    </div>
  );
};

export const Price = App.reactive(PriceComponent);
