import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';

import React from 'react';

import { PropertyModifyControllerInterface } from '../../../../classes/controller/property-modify-controller.interface.ts';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const property = useLoaderData(PropertyModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-l'}>
        <p className={s.label}>{property ? 'Редактировать свойство' : 'Новое свойство'}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
