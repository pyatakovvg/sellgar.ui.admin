import { StoreOfferEntity } from '@library/domain';
import { Typography, useCellData } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  value: 'quantity' | 'reserved' | 'available';
}

export const Inventory: React.FC<IProps> = (props) => {
  const { data } = useCellData<StoreOfferEntity>();
  const value = data.inventory?.[props.value] ?? 0;

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{value}</p>
      </Typography>
    </div>
  );
};
