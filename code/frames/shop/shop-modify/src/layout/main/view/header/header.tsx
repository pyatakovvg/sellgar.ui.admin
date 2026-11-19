import { Drawer, Typography } from '@sellgar/kit';
import { ArrowLeftLineIcon } from '@sellgar/kit/icons';
import { useController, useLoaderData } from '@sellgar/app/react';

import React from 'react';

import { ShopModifyControllerInterface } from '../../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.css';

export const Header: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);
  const controller = useController(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {data && <ArrowLeftLineIcon className={s.back} onClick={() => controller.toReview(data.uuid)} />}
        <Typography size={'body-m'} weight={'medium'}>
          <p className={s.label}>{data ? 'Редактирование' : 'Создание магазина'}</p>
        </Typography>
      </div>
      <Drawer.Close />
    </div>
  );
};
