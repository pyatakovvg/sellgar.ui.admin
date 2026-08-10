import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface InventoryProps {
  value: 'quantity' | 'reserved' | 'available';
}

const InventoryComponent: React.FC<InventoryProps> = (props) => {
  const { data } = Kit.useCellData<StoreOfferEntity>();
  const value = data.inventory?.[props.value] ?? 0;

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{value}</p>
      </Typography>
    </div>
  );
};

export const Inventory = App.reactive(InventoryComponent);
