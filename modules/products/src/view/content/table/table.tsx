import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { ProductControllerInterface } from '../../../classes/controller/product/product-controller.interface.ts';

import { Name } from './name';
import { Brand } from './brand';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const controller = App.useController(ProductControllerInterface);
  const products = App.useLoaderData(ProductControllerInterface);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: products.items }}
        layout={{ scroll: 'external', virtualization: true }}
        row={{
          handlers: {
            click: ({ row }) => void controller.open(row.uuid),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column key={'description'} resizable={true}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell render={({ row }) => <Name product={row} />} />
                </>
              )}
            </Column>
            <Column key={'brand'}>
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
