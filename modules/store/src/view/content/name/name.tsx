import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  product: StoreProductEntity;
}

const NameComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p className={s.name}>{props.product.productSnapshot?.name ?? 'Не синхронизирован'}</p>
      </Typography>
    </div>
  );
};

export const Name = App.reactive(NameComponent);
