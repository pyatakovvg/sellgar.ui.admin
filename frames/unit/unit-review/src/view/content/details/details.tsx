import { InfoLine } from '@library/design';
import { useLoaderData } from '@sellgar/app/react';
import { Divider, Typography } from '@sellgar/kit';

import React from 'react';

import { UnitReviewControllerInterface } from '../../../classes/controller/unit-review/unit-review-controller.interface.ts';

import s from './default.module.scss';

export const Details: React.FC = () => {
  const data = useLoaderData(UnitReviewControllerInterface);

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Сведения о размерности'} />
      <div className={s.content}>
        <InfoLine
          label={
            <Typography size={'caption-m'} weight={'semi-bold'}>
              <p className={s.label}>Наименование:</p>
            </Typography>
          }
          value={
            <Typography size={'caption-m'} weight={'regular'}>
              <p className={s.value}>{data.name}</p>
            </Typography>
          }
        />
        <InfoLine
          label={
            <Typography size={'caption-m'} weight={'semi-bold'}>
              <p className={s.label}>Код:</p>
            </Typography>
          }
          value={
            <Typography size={'caption-m'} weight={'regular'}>
              <p className={s.value}>{data.code}</p>
            </Typography>
          }
        />
        <InfoLine
          label={
            <Typography size={'caption-m'} weight={'semi-bold'}>
              <p className={s.label}>Обозначение:</p>
            </Typography>
          }
          value={
            <Typography size={'caption-m'} weight={'regular'}>
              <p className={s.value}>{data.symbol}</p>
            </Typography>
          }
        />
      </div>
    </div>
  );
};
