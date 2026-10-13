import type { PropertyEntity } from '@library/domain';
import { Typography } from '@sellgar/kit';
import React from 'react';
import { Values } from './values';
import s from './default.module.scss';

interface IProps {
  option: PropertyEntity['options'][number];
}
export const Option: React.FC<IProps> = (props) => (
  <div className={s.wrapper}>
    <Typography size={'caption-l'} weight={'medium'}>
      <p className={s.name}>{props.option.name}</p>
    </Typography>
    <Typography size={'caption-m'}>
      <p className={s.code}>Код: {props.option.code}</p>
    </Typography>
    <Values values={props.option.extras} />
  </div>
);
