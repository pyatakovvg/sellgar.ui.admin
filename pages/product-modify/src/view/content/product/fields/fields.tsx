import React from 'react';

import { Properties as PropertiesField } from '../../properties';

import { Name } from './name';
import { Category } from './category';
import { Brand } from './brand';
import { Description } from './description';

import s from './default.module.scss';

export const Fields: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <Name />
      </div>
      <div className={s.field}>
        <Category />
      </div>
      <div className={s.field}>
        <Brand />
      </div>
      <div className={s.field}>
        <Description />
      </div>
      <div className={s.field}>
        <PropertiesField name={'properties'} label={'Общие свойства товара'} scope={'product'} />
      </div>
    </div>
  );
};
