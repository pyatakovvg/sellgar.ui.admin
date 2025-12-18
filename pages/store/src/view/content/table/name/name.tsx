import { Typography, useCellData } from '@sellgar/kit';
import { ProductEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData<ProductEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.name}>{data.name}</p>
        </Typography>
      </div>
      <div className={s.additional}>
        {data.variants.map((variant) => {
          return (
            <div key={variant.uuid} className={s.variant}>
              <Typography size={'caption-m'} weight={'medium'}>
                <p>
                  {variant.name} ({variant.article})
                </p>
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};
