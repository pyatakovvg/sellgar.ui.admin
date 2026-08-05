import { Drawer, Typography } from '@sellgar/kit';
import { useLoaderData } from '@sellgar/app';

import React from 'react';

import { UnitModifyControllerInterface } from '../../../../classes/controller/unit-modify-controller.interface.ts';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const unit = useLoaderData(UnitModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-l'}>
        <p className={s.label}>{unit ? 'Редактировать размерность' : 'Новая размерность'}</p>
      </Typography>
      <Drawer.Close />
    </div>
  );
};
