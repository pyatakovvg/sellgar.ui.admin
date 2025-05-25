import { Typography, useCellData, InputNumeral } from '@sellgar/kit';
import { ProductEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Price: React.FC = () => {
  const { data } = useCellData<ProductEntity>();

  if (!data.prices[0]) {
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
      <Typography size={'caption-m'} weight={'semi-bold'}>
        <p className={s.value}>{InputNumeral.format(data.prices[0].value)}</p>
      </Typography>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.currency}>{data.prices[0].currency.name}</p>
      </Typography>
    </div>
  );
};
