import { Typography, useCellData } from '@sellgar/kit';
import { StoreProductEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Count: React.FC = () => {
  const { data } = useCellData<StoreProductEntity>();
  const quantity = data.offers.reduce((sum, offer) => sum + (offer.currentInventory?.quantity ?? 0), 0);

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
