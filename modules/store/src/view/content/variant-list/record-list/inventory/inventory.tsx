import type { StoreAccountingRecordEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  record: StoreAccountingRecordEntity;
  value: 'quantity' | 'reserved' | 'available';
}

const InventoryComponent: React.FC<IProps> = (props) => {
  const value = props.record.inventory[props.value];

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{value}</p>
      </Typography>
    </div>
  );
};

export const Inventory = App.reactive(InventoryComponent);
