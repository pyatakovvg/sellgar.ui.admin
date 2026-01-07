import React from 'react';

import { Common } from './common';
import { Price } from './price';
import { Variant } from './variant';

import s from './default.module.scss';

export const Form: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Common />
        </div>
        <div className={s.field}>
          <Price />
        </div>
        <div className={s.field}>
          <Variant />
        </div>
      </div>
    </div>
  );
};
