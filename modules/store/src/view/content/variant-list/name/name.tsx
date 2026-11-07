import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  offer: StoreOfferEntity;
}

const NameComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.variant}>{props.offer.variantSnapshot?.name ?? 'Не синхронизирован'}</p>
      </Typography>
    </div>
  );
};

export const Name = App.reactive(NameComponent);
