import { CurrencyEntity } from '@library/domain';

import React from 'react';

import { ProductOffers } from './product-offers';
import { type ProductOption } from './product-offers/product-option.ts';
import { Showing } from './showing';
import { Shop } from './shop';

import s from './default.module.scss';

interface FieldsProps {
  currencies: CurrencyEntity[];
  products: ProductOption[];
}

export const Fields: React.FC<FieldsProps> = ({ currencies, products }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Shop />
        </div>
        <div className={s.field}>
          <Showing />
        </div>
        <ProductOffers currencies={currencies} products={products} />
      </div>
    </div>
  );
};
