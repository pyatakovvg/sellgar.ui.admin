import type { CurrencyEntity } from '@library/domain';

import React from 'react';

import { ProductOffers } from './product-offers';
import { Showing } from './showing';
import { Shop } from './shop';

import s from './default.module.scss';

interface IProps {
  currencies: CurrencyEntity[];
}

export const Fields: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Shop />
        </div>
        <div className={s.field}>
          <Showing />
        </div>
        <ProductOffers currencies={props.currencies} />
      </div>
    </div>
  );
};
