import { UnitReviewRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { UnitControllerInterface } from '../../../classes/controller/unit/unit-controller.interface.ts';

import { Symbol } from './symbol';
import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

const TableView: React.FC = () => {
  const units = App.useLoaderData(UnitControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        size={'lg'}
        data={{ nodes: units.items, getRowId: (row) => row.code }}
        layout={{ scroll: 'external', virtualization: true }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(UnitReviewRoute, { params: { code: row.code } }),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column key={'name'} width={256}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Наименование'} />
                  <Cell render={({ row }) => <Name unit={row} />} />
                </>
              )}
            </Column>
            <Column key={'symbol'} width={120}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Обозначение'} />
                  <Cell render={({ row }) => <Symbol unit={row} />} />
                </>
              )}
            </Column>
            <Column key={'description'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell render={({ row }) => <Description unit={row} />} />
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
    </div>
  );
};

export const Table = App.reactive(TableView);
