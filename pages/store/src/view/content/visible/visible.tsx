import { Dot, useCellData } from '@sellgar/kit';
import { StoreProductEntity } from '@library/domain';
import { reactive } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

export const Visible: React.FC = reactive(() => {
  const { data } = useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Dot size={'lg'} color={data.showing ? 'green' : 'gray'} />
    </div>
  );
});
