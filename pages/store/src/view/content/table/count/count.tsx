import { Typography, useCellData, InputNumeral } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Count: React.FC = () => {
  const { data } = useCellData<StoreEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'semi-bold'}>
        <p className={s.value}>{InputNumeral.format(data.count)}</p>
      </Typography>
    </div>
  );
};
