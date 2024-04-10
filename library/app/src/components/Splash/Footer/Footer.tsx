import { Paragraph } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Paragraph>
        <b>Тестовое приложение</b>
      </Paragraph>
    </div>
  );
};
