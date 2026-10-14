import type { CurrencyEntity } from '@library/domain';

import React from 'react';

import { ProductOffers } from './product-offers';
import { type ProductOption } from './product-offers/product-option.ts';
import { Showing } from './showing';
import { Shop } from './shop';

import s from './default.module.scss';

interface IProps {
  currencies: CurrencyEntity[];
  products: ProductOption[];
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
        <ProductOffers currencies={props.currencies} products={props.products} />
      </div>
    </div>
  );
};
