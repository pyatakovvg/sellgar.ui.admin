import type { ProductEntity } from '@library/domain';
import * as App from '@sellgar/app-v2/react';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

const NameComponent: React.FC = () => {
  const { data } = Kit.useCellData<ProductEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p className={s.name}>{data.name}</p>
      </Typography>
      <div className={s.variants}>
        {data.variants.map((variant) => (
          <div key={variant.uuid} className={s.variant}>
            <Typography size={'caption-m'} weight={'medium'}>
              <p>{variant.name}</p>
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Name = App.reactive(NameComponent);
