import { Typography } from '@sellgar/kit';

import React from 'react';

import type { CategoryNodeEntity } from '@library/domain';

import s from './default.module.css';

interface IProps {
  category: CategoryNodeEntity;
}

export const Description: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p>{props.category.description ?? '—'}</p>
      </Typography>
    </div>
  );
};
