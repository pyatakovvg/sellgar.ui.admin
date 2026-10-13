import { useLoaderData } from '@sellgar/app/react';
import { Divider, Typography } from '@sellgar/kit';

import React from 'react';

import { PropertyReviewControllerInterface } from '../../../classes/controller/property-review/property-review-controller.interface.ts';

import s from './default.module.scss';

export const Description: React.FC = () => {
  const data = useLoaderData(PropertyReviewControllerInterface);

  return (
    <section className={s.wrapper} aria-label={'Описание свойства'}>
      <Divider type={'label-center'} label={'Описание'} />
      <Typography size={'caption-m'} weight={'regular'}>
        <p className={s.text}>{data.description || 'Не указано'}</p>
      </Typography>
    </section>
  );
};
