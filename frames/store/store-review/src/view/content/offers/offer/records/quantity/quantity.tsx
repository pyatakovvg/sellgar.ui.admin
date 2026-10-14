import type { StoreAccountingRecordEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';
import { Typography, useCellData } from '@sellgar/kit';
import React from 'react';
import s from './default.module.scss';
interface IProps {
  field: 'quantity' | 'reserved' | 'available';
}
const QuantityComponent: React.FC<IProps> = (props) => {
  const { data } = useCellData<StoreAccountingRecordEntity>();
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={props.field === 'available' ? 'semi-bold' : 'regular'}>
        <p className={s.value}>{data.inventory[props.field]}</p>
      </Typography>
    </div>
  );
};
export const Quantity = reactive(QuantityComponent);
