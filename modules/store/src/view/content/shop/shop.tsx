import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  product: StoreProductEntity;
}

const ShopComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{props.product.shopSnapshot?.name ?? 'Не синхронизирован'}</p>
      </Typography>
    </div>
  );
};

export const Shop = App.reactive(ShopComponent);
