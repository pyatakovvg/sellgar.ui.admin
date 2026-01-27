import { Typography, useCellData } from '@sellgar/kit';
import { amountFormat } from '@utils/format';

import React from 'react';

import s from './default.module.scss';

export const Price: React.FC = () => {
  const { data } = useCellData();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'bold'}>
        <p className={s.price}>{amountFormat(data.currentPrice.value, { hundredthsAfterDecimal: true })}</p>
      </Typography>
      <Typography size={'caption-s'} weight={'medium'}>
        <span className={s.currency}>{data.currentPrice.currency.name}</span>
      </Typography>
    </div>
  );
};
