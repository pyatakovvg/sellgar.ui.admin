import { Typography, useCellData } from '@sellgar/kit';
import { ProductVariantEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Product: React.FC = () => {
  const { data } = useCellData<ProductVariantEntity>();

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
