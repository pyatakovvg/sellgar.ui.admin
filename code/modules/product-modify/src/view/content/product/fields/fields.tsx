import React from 'react';

import { ProductProperties as PropertiesField } from '@library/product-form';

import { Name } from './name';
import { Type } from './type';
import { Brand } from './brand';
import { Description } from './description';

import s from './default.module.css';

export const Fields: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <Name />
      </div>
      <div className={s.field}>
        <Type />
      </div>
      <div className={s.field}>
        <Brand />
      </div>
      <div className={s.field}>
        <Description />
      </div>
      <div className={s.field}>
        <PropertiesField name={'properties'} label={'Общие свойства товара'} />
      </div>
    </div>
  );
};
