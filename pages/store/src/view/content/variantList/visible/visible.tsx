import { Dot, useCellData } from '@sellgar/kit';
import { StoreProductEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Visible: React.FC = () => {
  const { data } = useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Dot size={'md'} color={data.showing ? 'green' : 'gray'} />
    </div>
  );
};
