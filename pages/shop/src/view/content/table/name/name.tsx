import { Typography, useCellData } from '@sellgar/kit';
import { ShopEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData<ShopEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.name}>{data.name}</p>
        </Typography>
      </div>
    </div>
  );
};
