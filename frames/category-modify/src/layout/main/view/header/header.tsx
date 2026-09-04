import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@sellgar/app/react';

import React from 'react';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const category = useLoaderData(CategoryModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <p className={s.label}>{category ? 'Редактировать категорию' : 'Новая категория'}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
import { CategoryModifyControllerInterface } from '../../../../classes/controller/category-modify/category-modify-controller.interface.ts';
