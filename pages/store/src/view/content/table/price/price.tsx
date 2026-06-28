import { StoreProductEntity } from '@library/domain';
import { Typography, useCellData } from '@sellgar/kit';
import { amountFormat } from '@utils/format';

import React from 'react';

import s from './default.module.scss';

export const Price: React.FC = () => {
  const { data } = useCellData<StoreProductEntity>();
  const currentPrice = data.offers[0]?.currentPrice;

  if (!currentPrice) {
    return (
      <div className={s.wrapper}>
        <Typography size={'caption-m'} weight={'bold'}>
          <p className={s.price}>---</p>
        </Typography>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'bold'}>
        <p className={s.price}>{amountFormat(currentPrice.value, { hundredthsAfterDecimal: true })}</p>
      </Typography>
      <Typography size={'caption-s'} weight={'medium'}>
        <span className={s.currency}>{currentPrice.currency?.value ?? currentPrice.currency?.name ?? currentPrice.currencyCode}</span>
      </Typography>
    </div>
  );
};
