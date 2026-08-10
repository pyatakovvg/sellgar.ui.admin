import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const shop = useLoaderData(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <p className={s.label}>{shop ? 'Редактировать магазин' : 'Новый магазин'}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
import { ShopModifyControllerInterface } from '../../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';
