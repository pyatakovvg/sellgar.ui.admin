import type { UnitEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Description: React.FC = reactive(() => {
  const { data } = Kit.useCellData<UnitEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.text}>{data.description}</p>
      </Typography>
    </div>
  );
});
