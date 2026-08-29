import type { ProductEntity } from '@library/domain';
import * as App from '@sellgar/app-v2/react';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

const CategoryComponent: React.FC = () => {
  const { data } = Kit.useCellData<ProductEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={data.category ? 'medium' : 'semi-bold'}>
        <p className={s.value}>{data.category?.name ?? '---'}</p>
      </Typography>
    </div>
  );
};

export const Category = App.reactive(CategoryComponent);
