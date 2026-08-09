import type { PropertyEntity } from '@library/domain';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = Kit.useCellData<PropertyEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'semi-bold'}>
        <p className={s.name}>{data.name}</p>
      </Typography>
      {data.unit ? (
        <Typography size={'caption-m'} weight={'semi-bold'}>
          <p className={s.unit}>[{data.unit.name}]</p>
        </Typography>
      ) : null}
    </div>
  );
};
