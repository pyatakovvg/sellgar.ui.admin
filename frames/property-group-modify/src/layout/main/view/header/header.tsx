import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';

import React from 'react';

import { PropertyGroupModifyControllerInterface } from '../../../../classes/controller/property-group-modify-controller.interface.ts';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const group = useLoaderData(PropertyGroupModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-l'}>
        <p className={s.label}>{group ? 'Редактировать группу свойств' : 'Новая группа свойств'}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
