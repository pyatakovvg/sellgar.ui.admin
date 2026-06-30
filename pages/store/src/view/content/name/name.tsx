import { StoreProductEntity } from '@library/domain';
import { Typography, useCellData } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData<StoreProductEntity>();
  const firstOffer = data.offers[0];

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.name}>{data.product.name}</p>
        </Typography>
      </div>
    </div>
  );
};
