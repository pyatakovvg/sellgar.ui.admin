import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { ProductControllerInterface } from '../../../classes/controller/product/product-controller.interface.ts';

import { Name } from './name';
import { Category } from './category';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const controller = App.useController(ProductControllerInterface);
  const products = App.useLoaderData(ProductControllerInterface);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: products.data }}
        row={{
          handlers: {
            click: ({ row }) => void controller.open(row.uuid),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell>
                    <Name />
                  </Cell>
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Категория'} />
                  <Cell>
                    <Category />
                  </Cell>
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
    </div>
  );
};
