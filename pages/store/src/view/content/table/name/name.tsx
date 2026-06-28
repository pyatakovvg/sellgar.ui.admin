import { StoreEntity } from '@library/domain';
import { Typography, useCellData } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData<StoreEntity>();
  const firstOffer = data.offers[0];

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.name}>{data.titleOverride || data.productSnapshot?.name || data.productUuid}</p>
        </Typography>
      </div>
      <div className={s.additional}>
        <Typography size={'caption-s'} weight={'medium'}>
          <p className={s.variant}>{firstOffer?.variantSnapshot?.name ?? `Вариантов: ${data.offers.length}`}</p>
        </Typography>
      </div>
    </div>
  );
};
