import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app-v2/react';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

const ShopComponent: React.FC = () => {
  const { data } = Kit.useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{data.shop.name}</p>
      </Typography>
    </div>
  );
};

export const Shop = App.reactive(ShopComponent);
