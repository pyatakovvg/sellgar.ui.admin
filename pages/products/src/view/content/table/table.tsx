import * as App from '@sellgar/app';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { ProductsControllerInterface } from '../../../classes/controller/products-controller.interface.ts';

import { Name } from './name';
import { Category } from './category';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const products = App.useLoaderData(ProductsControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: products.data }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to('/products/' + row.uuid),
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
