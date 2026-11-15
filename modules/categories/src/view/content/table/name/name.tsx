import { Typography } from '@sellgar/kit';

import React from 'react';

import type { CategoryNodeEntity } from '@library/domain';

import s from './default.module.scss';

interface IProps {
  category: CategoryNodeEntity;
}

export const Name: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'semi-bold'}>
        <p className={s.text} title={props.category.name}>
          {props.category.name}
        </p>
      </Typography>
    </div>
  );
};
