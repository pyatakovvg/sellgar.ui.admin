import { BrandReviewRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { BrandControllerInterface } from '../../../classes/controller/brand/brand-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

const TableComponentView: React.FC = () => {
  const brands = App.useLoaderData(BrandControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        size={'md'}
        data={{ nodes: brands.items, getRowId: (row) => row.code }}
        layout={{ scroll: 'external', virtualization: true }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(BrandReviewRoute, { params: { code: row.code } }),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column key={'name'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Наименование'} />
                  <Cell render={({ row }) => <Name brand={row} />} />
                </>
              )}
            </Column>
            <Column key={'description'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell render={({ row }) => <Description brand={row} />} />
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
    </div>
  );
};

export const Table = App.reactive(TableComponentView);
