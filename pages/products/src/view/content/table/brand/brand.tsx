import type { ProductSummaryEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

const BrandComponent: React.FC = () => {
  const { data } = Kit.useCellData<ProductSummaryEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{data.brandCode}</p>
      </Typography>
    </div>
  );
};

export const Brand = App.reactive(BrandComponent);
