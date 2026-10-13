import { InfoLine } from '@library/design';
import { useLoaderData } from '@sellgar/app/react';
import { Divider, Typography } from '@sellgar/kit';

import React from 'react';

import { PropertyReviewControllerInterface } from '../../../classes/controller/property-review/property-review-controller.interface.ts';

import { PropertyKindLabelFactory } from './factory/property-kind-label.factory.ts';

import s from './default.module.scss';

export const Details: React.FC = () => {
  const data = useLoaderData(PropertyReviewControllerInterface);

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Сведения о свойстве'} />
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
              <p className={s.label}>Тип значения:</p>
            </Typography>
          }
          value={
            <Typography size={'caption-m'} weight={'regular'}>
              <p className={s.value}>{PropertyKindLabelFactory.create(data.kind)}</p>
            </Typography>
          }
        />
        <InfoLine
          label={
            <Typography size={'caption-m'} weight={'semi-bold'}>
              <p className={s.label}>Размерность:</p>
            </Typography>
          }
          value={
            <Typography size={'caption-m'} weight={'regular'}>
              <p className={s.value}>{data.unitCode || 'Без размерности'}</p>
            </Typography>
          }
        />
      </div>
    </div>
  );
};
