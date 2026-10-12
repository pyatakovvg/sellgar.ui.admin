import { useLoaderData } from '@sellgar/app/react';
import { Divider, Typography } from '@sellgar/kit';

import React from 'react';

import { BrandReviewControllerInterface } from '../../../classes/controller/brand-review/brand-review-controller.interface.ts';

import s from './default.module.scss';

export const Description: React.FC = () => {
  const data = useLoaderData(BrandReviewControllerInterface);

  return (
    <section className={s.wrapper} aria-label={'Описание бренда'}>
      <Divider type={'label-center'} label={'Описание'} />
      <Typography size={'caption-m'} weight={'regular'}>
        <p className={s.text}>{data.description || 'Не указано'}</p>
      </Typography>
    </section>
  );
};
