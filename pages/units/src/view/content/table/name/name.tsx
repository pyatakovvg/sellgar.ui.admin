import type { UnitEntity } from '@library/domain';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = Kit.useCellData<UnitEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>{data.name}</p>
      </Typography>
    </div>
  );
};
