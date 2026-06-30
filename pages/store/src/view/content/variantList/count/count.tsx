import { Typography, useCellData } from '@sellgar/kit';
import { StoreOfferEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Count: React.FC = () => {
  const { data } = useCellData<StoreOfferEntity>();
  const quantity = data.inventory?.quantity ?? 0;

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-m'} weight={'medium'}>
          <p className={s.text}>{quantity}</p>
        </Typography>
      </div>
    </div>
  );
};
