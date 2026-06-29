import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';

import React from 'react';

import { CategoryModifyControllerInterface } from '../../../../classes/controller/category-modify-controller.interface.ts';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const category = useLoaderData(CategoryModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-l'}>
        <p className={s.label}>{category ? 'Редактировать категорию' : 'Новая категория'}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
