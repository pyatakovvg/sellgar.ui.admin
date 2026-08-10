import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app';
import * as Kit from '@sellgar/kit';
import { Dot } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

const VisibleComponent: React.FC = () => {
  const { data } = Kit.useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>
      <Dot size={'lg'} color={data.showing ? 'green' : 'gray'} />
    </div>
  );
};

export const Visible = App.reactive(VisibleComponent);
