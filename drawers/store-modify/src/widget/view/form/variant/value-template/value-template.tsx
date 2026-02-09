import { VariantEntity } from '@library/domain';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const ValueTemplate: React.FC<VariantEntity> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.variant}>
        <Typography size={'caption-l'} weight={'semi-bold'}>
          <p>{props.name}</p>
        </Typography>
      </div>
      <div className={s.product}>
        <Typography size={'caption-m'} weight={'regular'}>
          <p>{props.product.name}</p>
        </Typography>
      </div>
    </div>
  );
};
