import { Typography, useCellData } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data } = useCellData<StoreEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.name}>{data.variant.name}</p>
        </Typography>
      </div>
      <div className={s.additional}>
        <Typography size={'caption-s'} weight={'medium'}>
          <p className={s.name}>{data.variant.product.name}</p>
        </Typography>
      </div>
      {/*<div className={s.additional}>*/}
      {/*  {data.variants.map((variant) => {*/}
      {/*    return (*/}
      {/*      <div key={variant.uuid} className={s.variant}>*/}
      {/*        <Typography size={'caption-m'} weight={'medium'}>*/}
      {/*          <p>*/}
      {/*            {variant.name} ({variant.article})*/}
      {/*          </p>*/}
      {/*        </Typography>*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
    </div>
  );
};
