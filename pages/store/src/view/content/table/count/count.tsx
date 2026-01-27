import { Typography, useCellData } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Count: React.FC = () => {
  const { data } = useCellData<StoreEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-m'} weight={'medium'}>
          <p className={s.text}>{data.count}</p>
        </Typography>
      </div>
    </div>
  );
};
