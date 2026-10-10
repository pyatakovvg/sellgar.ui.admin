import React from 'react';

import { Product } from './product';
import { Variants } from './variants';

import s from './default.module.scss';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.product}>
        <Product />
      </div>
      <div className={s.variants}>
        <Variants />
      </div>
    </div>
  );
};
