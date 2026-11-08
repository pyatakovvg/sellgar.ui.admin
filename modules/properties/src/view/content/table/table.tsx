import { PropertyReviewRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { PropertyControllerInterface } from '../../../classes/controller/property/property-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

const TableView: React.FC = () => {
  const properties = App.useLoaderData(PropertyControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        size={'lg'}
        data={{ nodes: properties.items }}
        layout={{ scroll: 'external', virtualization: true }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(PropertyReviewRoute, { params: { code: row.code } }),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column key={'name'} width={256}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Наименование'} />
                  <Cell render={({ row }) => <Name property={row} />} />
                </>
              )}
            </Column>
            <Column key={'description'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell render={({ row }) => <Description property={row} />} />
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
