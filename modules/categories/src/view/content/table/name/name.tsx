import type { CategoryEntity } from '@library/domain';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { deps, data } = Kit.useCellData<CategoryEntity>();

  return (
    <div className={s.wrapper}>
      {Array.from({ length: deps }, (_, depth) => (
        <span key={depth} className={s.indentation} aria-hidden={true} />
      ))}
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'semi-bold'}>
          <p className={s.text}>{data.name}</p>
        </Typography>
      </div>
    </div>
  );
};
