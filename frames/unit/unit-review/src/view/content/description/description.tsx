import { useLoaderData } from '@sellgar/app/react';
import { Divider, Typography } from '@sellgar/kit';

import React from 'react';

import { UnitReviewControllerInterface } from '../../../classes/controller/unit-review/unit-review-controller.interface.ts';

import s from './default.module.scss';

export const Description: React.FC = () => {
  const data = useLoaderData(UnitReviewControllerInterface);

  return (
    <section className={s.wrapper} aria-label={'Описание размерности'}>
      <Divider type={'label-center'} label={'Описание'} />
      <Typography size={'caption-m'} weight={'regular'}>
        <p className={s.text}>{data.description || 'Не указано'}</p>
      </Typography>
    </section>
  );
};
