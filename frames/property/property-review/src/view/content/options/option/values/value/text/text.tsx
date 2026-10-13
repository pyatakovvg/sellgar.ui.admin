import type { PropertyEntity } from '@library/domain';
import { Typography } from '@sellgar/kit';
import React from 'react';
import s from './default.module.scss';

interface IProps {
  value: PropertyEntity['options'][number]['extras'][number];
}
export const TextValue: React.FC<IProps> = (props) => {
  const extra = props.value;
  const label = extra.type === 'COLOR' ? 'Цвет' : extra.textDisplay === 'ICON' ? 'Код иконки' : 'Текст';
  const value = extra.type === 'COLOR' ? extra.valueColor : extra.valueText;
  return (
    <Typography size={'caption-m'}>
      <p className={s.text}>
        {label}: {value}
      </p>
    </Typography>
  );
};
