import * as Tokens from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { ShopControllerInterface } from '../../../classes/controller/shop/shop-controller.interface.ts';

import { Name } from './name';
import { Inn } from './inn';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const shops = App.useLoaderData(ShopControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        size={'lg'}
        data={{ nodes: shops.data, getRowId: (row) => row.uuid }}
        layout={{ scroll: 'external', virtualization: true }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(Tokens.ShopReviewRoute, { params: { uuid: row.uuid } }),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column key={'name'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Название'} />
                  <Cell render={({ row }) => <Name shop={row} />} />
                </>
              )}
            </Column>
            <Column key={'inn'} width={144}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'ИНН'} />
                  <Cell render={({ row }) => <Inn shop={row} />} />
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
    </div>
  );
};
