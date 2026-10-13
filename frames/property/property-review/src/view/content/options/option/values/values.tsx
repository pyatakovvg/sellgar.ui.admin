import type { PropertyEntity } from '@library/domain';
import React from 'react';
import { Value } from './value';
import s from './default.module.scss';

interface IProps {
  values: PropertyEntity['options'][number]['extras'];
}
export const Values: React.FC<IProps> = (props) => (
  <div className={s.wrapper}>
    {props.values.map((value) => (
      <Value key={value.sortOrder} value={value} />
    ))}
  </div>
);
