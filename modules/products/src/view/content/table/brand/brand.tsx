import type { ProductSummaryEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  product: ProductSummaryEntity;
}

const BrandComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{props.product.brandCode}</p>
      </Typography>
    </div>
  );
};

export const Brand = App.reactive(BrandComponent);
