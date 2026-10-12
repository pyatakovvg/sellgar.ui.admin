import React from 'react';
import { Details } from './details';
import { Description } from './description';
import { Promo } from './promo';
import s from './default.module.scss';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Promo />
      <Details />
      <Description />
    </div>
  );
};
