import type { ProductSummaryEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  product: ProductSummaryEntity;
}

const NameComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p className={s.name}>{props.product.name}</p>
      </Typography>
      <div className={s.variants}>
        {props.product.variants.map((variant) => (
          <div key={variant.uuid} className={s.variant}>
            <Typography size={'caption-m'} weight={'medium'}>
              <p>{variant.name}</p>
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Name = App.reactive(NameComponent);
