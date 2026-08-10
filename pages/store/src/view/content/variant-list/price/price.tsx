import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';
import { amountFormat } from '@utils/format';

import React from 'react';

import s from './default.module.scss';

const PriceComponent: React.FC = () => {
  const { data } = Kit.useCellData<StoreOfferEntity>();
  const currentPrice = data.currentPrice;
  const value = currentPrice ? amountFormat(currentPrice.value, { hundredthsAfterDecimal: true }) : '---';

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'bold'}>
        <p className={s.price}>{value}</p>
      </Typography>
      {currentPrice ? (
        <Typography size={'caption-s'} weight={'medium'}>
          <span className={s.currency}>{currentPrice.currency.value}</span>
        </Typography>
      ) : null}
    </div>
  );
};

export const Price = App.reactive(PriceComponent);
