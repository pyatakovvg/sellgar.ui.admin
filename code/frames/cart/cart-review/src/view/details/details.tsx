import React from 'react';

import { useLoaderData } from '@sellgar/app/react';

import { CartReviewControllerInterface } from '../../classes/controller/cart-review/cart-review-controller.interface.ts';

import s from './default.module.css';

const DATE_FORMATTER = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' });

export const Details: React.FC = () => {
  const cart = useLoaderData(CartReviewControllerInterface);

  if (cart === null) return null;

  return (
    <dl className={s.wrapper}>
      <dt className={s.label}>Магазин</dt>
      <dd className={s.value}>{cart.shop.name ?? cart.shop.uuid}</dd>
      <dt className={s.label}>Корзина</dt>
      <dd className={s.value}>{cart.uuid}</dd>
      <dt className={s.label}>Владелец</dt>
      <dd className={s.value}>{cart.ownerUuid}</dd>
      <dt className={s.label}>Состояние</dt>
      <dd className={s.value}>{cart.closedAt === null ? 'Активна' : 'Закрыта'}</dd>
      <dt className={s.label}>Создана</dt>
      <dd className={s.value}>{DATE_FORMATTER.format(new Date(cart.createdAt))}</dd>
      <dt className={s.label}>Обновлена</dt>
      <dd className={s.value}>{DATE_FORMATTER.format(new Date(cart.updatedAt))}</dd>
      {cart.closedAt !== null ? (
        <>
          <dt className={s.label}>Закрыта</dt>
          <dd className={s.value}>{DATE_FORMATTER.format(new Date(cart.closedAt))}</dd>
        </>
      ) : null}
    </dl>
  );
};
