import type { StoreAccountingRecordEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';
import React from 'react';
import s from './default.module.scss';
interface IProps {
  record: StoreAccountingRecordEntity;
}
const EntryComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'semi-bold'}>
        <p className={s.article}>{props.record.article}</p>
      </Typography>
      {props.record.clarifications.map((item) => (
        <Typography key={item.position} size={'caption-m'} weight={'regular'}>
          <p className={s.clarification}>{item.value}</p>
        </Typography>
      ))}
    </div>
  );
};
export const Entry = reactive(EntryComponent);
