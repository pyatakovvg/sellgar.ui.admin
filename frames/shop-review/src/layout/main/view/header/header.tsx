import { Drawer, Typography } from '@sellgar/kit';
import { ArrowLeftLineIcon } from '@sellgar/kit/icons';
import { useLoaderData } from '@sellgar/app/react';

import React from 'react';

import { ShopModifyControllerInterface } from '../../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const shop = useLoaderData(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'body-m'} weight={'medium'}>
          <p className={s.label}>Магазин</p>
        </Typography>
      </div>

      <Drawer.Close />
    </div>
  );
};
