import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';
import { amountFormat } from '@utils/format';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  offer: StoreOfferEntity;
}

const PriceComponent: React.FC<IProps> = (props) => {
  const currentPrice = props.offer.currentPrice;
  const value = currentPrice ? amountFormat(currentPrice.value, { hundredthsAfterDecimal: true }) : '---';

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'bold'}>
        <p className={s.price}>{value}</p>
      </Typography>
      {currentPrice ? (
        <Typography size={'caption-s'} weight={'medium'}>
          <span className={s.currency}>{currentPrice.currency.value}</span>
        </Typography>
      ) : null}
    </div>
  );
};

export const Price = App.reactive(PriceComponent);
