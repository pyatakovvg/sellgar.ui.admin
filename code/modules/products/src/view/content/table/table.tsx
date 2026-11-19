import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { ProductControllerInterface } from '../../../classes/controller/product/product-controller.interface.ts';

import { Name } from './name';
import { Brand } from './brand';

import s from './default.module.css';

export const Table: React.FC = () => {
  const controller = App.useController(ProductControllerInterface);
  const products = App.useLoaderData(ProductControllerInterface);
  const revalidate = App.useRevalidate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        loading={revalidate.inProcess}
        data={{ nodes: products.items }}
        row={{
          handlers: {
            click: ({ row }) => void controller.open(row.uuid),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column resizable={true}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell render={({ row }) => <Name product={row} />} />
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Бренд'} />
                  <Cell render={({ row }) => <Brand product={row} />} />
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
    </div>
  );
};
