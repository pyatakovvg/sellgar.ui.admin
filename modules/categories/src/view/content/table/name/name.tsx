import type { CategoryEntity } from '@library/domain';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  category: CategoryEntity;
  depth: number;
}

export const Name: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      {Array.from({ length: props.depth }, (_, depth) => (
        <span key={depth} className={s.indentation} aria-hidden={true} />
      ))}
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'semi-bold'}>
          <p className={s.text}>{props.category.name}</p>
        </Typography>
      </div>
    </div>
  );
};
