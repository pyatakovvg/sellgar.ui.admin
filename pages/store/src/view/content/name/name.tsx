import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app-v2/react';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

const NameComponent: React.FC = () => {
  const { data } = Kit.useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p className={s.name}>{data.product.name}</p>
      </Typography>
    </div>
  );
};

export const Name = App.reactive(NameComponent);
