import React from 'react';

import { Paragraph } from '@/typography/Paragraph';

import s from './default.module.scss';

export const Empty: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Paragraph>Нет данных</Paragraph>
    </div>
  );
};
