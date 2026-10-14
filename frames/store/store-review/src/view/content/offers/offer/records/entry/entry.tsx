import type { StoreAccountingRecordEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';
import { Typography, useCellData } from '@sellgar/kit';
import React from 'react';
import s from './default.module.scss';
const EntryComponent: React.FC = () => {
  const { data } = useCellData<StoreAccountingRecordEntity>();
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'semi-bold'}>
        <p className={s.article}>{data.article}</p>
      </Typography>
      {data.clarifications.map((item) => (
        <Typography key={item.position} size={'caption-m'} weight={'regular'}>
          <p className={s.clarification}>{item.value}</p>
        </Typography>
      ))}
    </div>
  );
};
export const Entry = reactive(EntryComponent);
