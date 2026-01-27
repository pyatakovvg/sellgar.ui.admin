import { Typography, useCellData } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.name}>{data.variant.name}</p>
        </Typography>
      </div>
      <div className={s.additional}>
        <Typography size={'caption-s'} weight={'medium'}>
          <p className={s.variant}>({data.variant.product.name})</p>
        </Typography>
      </div>
    </div>
  );
};
