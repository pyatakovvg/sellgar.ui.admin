import React from 'react';

import { useLoaderData, useRevalidate } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';
import { Table } from '@sellgar/kit/table';

import { CartReviewControllerInterface } from '../../classes/controller/cart-review/cart-review-controller.interface.ts';
import { formatMoney } from '../formatter/cart.formatter.ts';
import { Entry } from './entry';

import s from './default.module.css';

export const Items: React.FC = () => {
  const cart = useLoaderData(CartReviewControllerInterface);
  const revalidate = useRevalidate();

  if (cart === null) return null;

  return (
    <section className={s.wrapper} aria-label="Состав корзины">
      <Typography size="body-s" weight="semi-bold">
        <h3 className={s.title}>Состав корзины · {cart.items.length}</h3>
      </Typography>
      <Table
        loading={revalidate.inProcess}
        size="sm"
        style="secondary"
        data={{ nodes: cart.items }}
        layout={{ scroll: 'external', virtualization: true, stickyHeader: false }}
      >
        {({ Column }) => (
          <>
            <Column width={176}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Товар" />
                  <Cell render={({ row }) => <Entry item={row} />} />
                </>
              )}
            </Column>
            <Column width={56} align="right">
              {({ Head, Cell }) => (
                <>
                  <Head label={<abbr title="Количество">Кол.</abbr>} />
                  <Cell render={({ row }) => <span className={s.value}>{row.quantity}</span>} />
                </>
              )}
            </Column>
            <Column width={104} align="right">
              {({ Head, Cell }) => (
                <>
                  <Head label="Цена" />
                  <Cell
                    render={({ row }) => (
                      <span className={s.value}>
                        {row.price ? formatMoney(row.price.value, row.price.currencyCode) : 'Нет цены'}
                      </span>
                    )}
                  />
                </>
              )}
            </Column>
            <Column width={112} align="right">
              {({ Head, Cell }) => (
                <>
                  <Head label="Сумма" />
                  <Cell
                    render={({ row }) => (
                      <span className={s.value}>
                        {formatMoney(row.subtotal, row.price?.currencyCode ?? cart.currencyCode)}
                      </span>
                    )}
                  />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
      {cart.items.length === 0 ? (
        <p className={s.empty} role="status">
          В корзине пока нет товаров
        </p>
      ) : null}
    </section>
  );
};
