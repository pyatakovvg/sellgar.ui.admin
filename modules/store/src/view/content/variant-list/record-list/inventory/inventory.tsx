import type { StoreAccountingRecordEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  value: 'quantity' | 'reserved' | 'available';
}

const InventoryComponent: React.FC<IProps> = (props) => {
  const { data } = Kit.useCellData<StoreAccountingRecordEntity>();
  const value = data.inventory[props.value];

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{value}</p>
      </Typography>
    </div>
  );
};

export const Inventory = App.reactive(InventoryComponent);
