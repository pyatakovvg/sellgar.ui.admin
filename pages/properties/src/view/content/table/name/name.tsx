import { Typography } from '@sellgar/kit';
import { useCellData } from '@library/table';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>
          {data.name} {data.unit && <>({data.unit.name})</>}
        </p>
      </Typography>
    </div>
  );
};
