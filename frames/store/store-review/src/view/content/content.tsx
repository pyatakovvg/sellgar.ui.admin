import React from 'react';
import { Details } from './details';
import { Offers } from './offers';
import s from './default.module.scss';
export const Content: React.FC = () => (
  <div className={s.wrapper}>
    <Details />
    <Offers />
  </div>
);
