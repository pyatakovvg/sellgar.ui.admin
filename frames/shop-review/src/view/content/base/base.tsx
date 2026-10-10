import { useLoaderData } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import { ShopModifyControllerInterface } from '../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.css';

export const Base: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-s'}>
        <p className={s.title}>"{data.name}"</p>
      </Typography>
    </div>
  );
};
