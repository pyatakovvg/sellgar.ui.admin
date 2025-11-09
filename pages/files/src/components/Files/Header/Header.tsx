import { Button, Typography } from '@sellgar/kit';

import React from 'react';

import { UploadDialog } from './UploadDialog';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h3'} weight={'medium'}>
          Файлы
        </Typography>
      </div>
      <div className={s.content}>
        <div className={s.link}>
          <Button size={'sm'} style={'secondary'}>
            Добавить каталок
          </Button>
        </div>
        <div className={s.link}>
          <UploadDialog />
        </div>
      </div>
    </div>
  );
};
