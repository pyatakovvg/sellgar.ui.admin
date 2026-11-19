import React from 'react';

import type { CartItemEntity } from '@library/domain';

import s from './default.module.css';

interface IProps {
  item: CartItemEntity;
}

export const Entry: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <p className={s.name}>{props.item.productName ?? 'Товар без названия'}</p>
      {props.item.variantName ? <p className={s.detail}>{props.item.variantName}</p> : null}
      {props.item.article ? <p className={s.detail}>Артикул: {props.item.article}</p> : null}
      {props.item.clarifications.length > 0 ? (
        <p className={s.detail}>{props.item.clarifications.join(' · ')}</p>
      ) : null}
      <p className={s.detail}>
        {props.item.availableQuantity === null ? 'Остаток неизвестен' : `Доступно: ${props.item.availableQuantity}`}
      </p>
      <p className={s.message}>
        {props.item.message ?? (props.item.canCheckout ? 'Доступен к оформлению' : 'Недоступен к оформлению')}
      </p>
    </div>
  );
};
