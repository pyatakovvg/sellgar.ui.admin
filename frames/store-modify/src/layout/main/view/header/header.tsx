import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@sellgar/app/react';

import React from 'react';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const storeProduct = useLoaderData(StoreModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <p className={s.label}>{storeProduct ? 'Редактировать товар витрины' : 'Новый товар витрины'}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
import { StoreModifyControllerInterface } from '../../../../classes/controller/store-modify/store-modify-controller.interface.ts';
