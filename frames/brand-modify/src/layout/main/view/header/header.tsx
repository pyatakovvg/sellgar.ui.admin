import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@sellgar/app/react';

import React from 'react';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const brand = useLoaderData(BrandModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <p className={s.label}>{brand ? 'Редактировать бренд' : 'Новый бренд'}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
import { BrandModifyControllerInterface } from '../../../../classes/controller/brand-modify/brand-modify-controller.interface.ts';
