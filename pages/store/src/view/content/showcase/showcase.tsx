import { StoreProductEntity } from '@library/domain';
import { Typography, useCellData } from '@sellgar/kit';
import { reactive } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

export const Showcase: React.FC = reactive(() => {
  const { data } = useCellData<StoreProductEntity>();
  const totalOffers = data.offers.length;
  const configuredOffers = data.offers.filter((offer) => offer.showing).length;
  const visibleOffers = data.showing ? configuredOffers : 0;
  const value = totalOffers > 0 ? `${visibleOffers}/${totalOffers} на витрине` : 'Нет офферов';
  const details = data.showing ? 'доступные офферы' : 'товар выключен';

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
});
