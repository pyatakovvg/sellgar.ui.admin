import { ButtonContext, ESize, Heading } from '@library/kit';

import React from 'react';

import { UploadDialog } from './UploadDialog';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H3'}>Файлы</Heading>
      </div>
      <div className={s.content}>
        <div className={s.link}>
          <ButtonContext size={ESize.SM}>Добавить каталок</ButtonContext>
        </div>
        <div className={s.link}>
          <UploadDialog />
        </div>
      </div>
    </div>
  );
};
