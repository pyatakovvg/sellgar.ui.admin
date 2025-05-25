import { Typography, useCellData } from '@sellgar/kit';
import { ProductVariantEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Variant: React.FC = () => {
  const { data } = useCellData<ProductVariantEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.name}>
            {data.name} ({data.article})
          </p>
        </Typography>
      </div>
    </div>
  );
};
