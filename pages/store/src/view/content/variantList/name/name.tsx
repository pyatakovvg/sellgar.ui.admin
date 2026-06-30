import { StoreOfferEntity } from '@library/domain';
import { Typography, useCellData } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData<StoreOfferEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.additional}>
        <Typography size={'caption-m'} weight={'medium'}>
          <p className={s.variant}>{data.variant.name}</p>
        </Typography>
      </div>
    </div>
  );
};
