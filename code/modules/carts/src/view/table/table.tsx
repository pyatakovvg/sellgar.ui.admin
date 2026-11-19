import React from 'react';

import { useLoaderData, useNavigate, useRevalidate } from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import { CartReviewRoute } from '@library/route-tokens';

import { CartControllerInterface } from '../../classes/controller/cart/cart-controller.interface.ts';

import s from './default.module.css';

const DATE_FORMATTER = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' });

export const Table: React.FC = () => {
  const carts = useLoaderData(CartControllerInterface);
  const revalidate = useRevalidate();
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        loading={revalidate.inProcess}
        size={'lg'}
        data={{ nodes: carts.data }}
        row={{ handlers: { click: ({ row }) => void navigate.to(CartReviewRoute, { params: { uuid: row.uuid } }) } }}
      >
        {({ Column }) => (
          <>
            <Column minWidth={200}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Магазин'} />
                  <Cell
                    render={({ row }) => (
                      <span className={s.value} title={row.shop.name ?? row.shop.uuid}>
                        {row.shop.name ?? row.shop.uuid}
                      </span>
                    )}
                  />
                </>
              )}
            </Column>
            <Column width={104}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Позиций'} />
                  <Cell render={({ row }) => <span className={s.value}>{row.itemsCount}</span>} />
                </>
              )}
            </Column>
            <Column width={128}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Состояние'} />
                  <Cell
                    render={({ row }) => (
                      <span className={s.value}>{row.closedAt === null ? 'Активна' : 'Закрыта'}</span>
                    )}
                  />
                </>
              )}
            </Column>
            <Column width={176}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Обновлена'} />
                  <Cell
                    render={({ row }) => (
                      <span className={s.value}>{DATE_FORMATTER.format(new Date(row.updatedAt))}</span>
                    )}
                  />
                </>
              )}
            </Column>
            <Column width={192}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Корзина'} />
                  <Cell
                    render={({ row }) => (
                      <span className={s.value} title={row.uuid}>
                        {row.uuid}
                      </span>
                    )}
                  />
                </>
              )}
            </Column>
            <Column width={192}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Владелец'} />
                  <Cell
                    render={({ row }) => (
                      <span className={s.value} title={row.ownerUuid}>
                        {row.ownerUuid}
                      </span>
                    )}
                  />
                </>
              )}
            </Column>
            <Column width={176}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Создана'} />
                  <Cell
                    render={({ row }) => (
                      <span className={s.value}>{DATE_FORMATTER.format(new Date(row.createdAt))}</span>
                    )}
                  />
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
      {carts.data.length === 0 ? (
        <p className={s.empty} role="status">
          Корзины не найдены
        </p>
      ) : null}
    </div>
  );
};
