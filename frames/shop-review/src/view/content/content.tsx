import React from 'react';

import { Base } from './base';
import { Contacts } from './contacts';
import { Address } from './address';
import { Type } from './type';

import s from './default.module.css';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Base />
      <Contacts />
      <Address />
      <Type />
    </div>
  );
};
