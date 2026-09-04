import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@sellgar/app/react';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../classes/controller/context/store-inventory-context-controller.interface.ts';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const data = useLoaderData(StoreInventoryContextControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-l'}>
        <p className={s.label}>Остаток: {data.offer.variant.name}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
