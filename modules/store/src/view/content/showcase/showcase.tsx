import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  product: StoreProductEntity;
}

const ShowcaseComponent: React.FC<IProps> = (props) => {
  const totalOffers = props.product.offers.length;
  const configuredOffers = props.product.offers.filter((offer) => offer.showing).length;
  const visibleOffers = props.product.showing ? configuredOffers : 0;
  const value = totalOffers > 0 ? `${visibleOffers}/${totalOffers} на витрине` : 'Нет офферов';
  const details = props.product.showing ? 'доступные офферы' : 'товар выключен';

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.value}>{value}</p>
      </Typography>
      <Typography size={'caption-m'}>
        <p className={s.caption}>{details}</p>
      </Typography>
    </div>
  );
};

export const Showcase = App.reactive(ShowcaseComponent);
