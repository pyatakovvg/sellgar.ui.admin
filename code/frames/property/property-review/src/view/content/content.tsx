import React from 'react';
import { Details } from './details';
import { Description } from './description';
import { Options } from './options';
import s from './default.module.css';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Details />
      <Description />
      <Options />
    </div>
  );
};
