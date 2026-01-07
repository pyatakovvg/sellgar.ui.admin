import { Typography, useCellData } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';
import { amountFormat } from '@utils/format';

import React from 'react';

import s from './default.module.scss';

export const Price: React.FC = () => {
  const { data } = useCellData<StoreEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.name}>
            {amountFormat(data.currentPrice.value)} {data.currentPrice.currency.name}
          </p>
        </Typography>
      </div>
    </div>
  );
};
