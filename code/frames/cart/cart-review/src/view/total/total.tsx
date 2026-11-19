import React from 'react';

import { useLoaderData } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import { CartReviewControllerInterface } from '../../classes/controller/cart-review/cart-review-controller.interface.ts';
import { formatMoney } from '../formatter/cart.formatter.ts';

import s from './default.module.css';

export const Total: React.FC = () => {
  const cart = useLoaderData(CartReviewControllerInterface);

  if (cart === null) return null;

  return (
    <div className={s.wrapper}>
      <Typography size="body-s" weight="semi-bold">
        <p className={s.label}>Сумма товаров</p>
      </Typography>
      <Typography size="body-s" weight="semi-bold">
        <p className={s.value}>{formatMoney(cart.itemsTotal, cart.currencyCode)}</p>
      </Typography>
    </div>
  );
};
