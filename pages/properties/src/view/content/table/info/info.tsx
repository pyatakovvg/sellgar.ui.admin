import { Typography, useCellData } from '@sellgar/kit';
import { PropertyEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Info: React.FC = () => {
  const { data } = useCellData<PropertyEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p>{data.description}</p>
      </Typography>
    </div>
  );
};
