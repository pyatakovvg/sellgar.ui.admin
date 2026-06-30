import { Typography, useCellData } from '@sellgar/kit';
import { StoreOfferEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Article: React.FC = () => {
  const { data } = useCellData<StoreOfferEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-s'} weight={'medium'}>
          <p className={s.name}>#{data.article ?? '---'}</p>
        </Typography>
      </div>
    </div>
  );
};
