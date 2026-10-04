import * as App from '@sellgar/app/react';
import { Button, Typography } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { TemplatesControllerInterface } from '../../classes/controller/templates-controller.interface.ts';

import s from './header.module.scss';

export const Header: React.FC = () => {
  const controller = App.useController(TemplatesControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'h6'} weight={'semi-bold'}>
        <h2>Шаблоны</h2>
      </Typography>
      <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={() => void controller.create()}>
        Добавить шаблон
      </Button>
    </div>
  );
};
