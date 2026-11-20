import * as App from '@sellgar/app/react';
import { Button } from '@sellgar/kit';
import { AddLineIcon, FileList3LineIcon } from '@sellgar/kit/icons';
import { PageTitle } from '@library/design';

import React from 'react';

import { TemplatesControllerInterface } from '../../classes/controller/templates-controller.interface.ts';

import s from './header.module.css';

export const Header: React.FC = () => {
  const controller = App.useController(TemplatesControllerInterface);

  return (
    <div className={s.wrapper}>
      <PageTitle icon={<FileList3LineIcon />}>
        <h2>Шаблоны</h2>
      </PageTitle>
      <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={() => void controller.create()}>
        Добавить шаблон
      </Button>
    </div>
  );
};
