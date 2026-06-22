import { UnitEntity } from '@library/domain';
import { Typography, useCellData } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData<UnitEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>{data.name}</p>
      </Typography>
    </div>
  );
};
