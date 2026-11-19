import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { TemplatesControllerInterface } from '../../classes/controller/templates-controller.interface.ts';

import { Name } from './name';
import { ProductCount } from './product-count';

import s from './content.module.css';

export const Content: React.FC = () => {
  const controller = App.useController(TemplatesControllerInterface);
  const templates = App.useLoaderData(TemplatesControllerInterface);
  const revalidate = App.useRevalidate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        loading={revalidate.inProcess}
        size={'lg'}
        data={{ nodes: templates.items }}
        layout={{ scroll: 'external', virtualization: true }}
        row={{ handlers: { click: ({ row }) => void controller.open(row.uuid) } }}
      >
        {({ Column }) => (
          <>
            <Column minWidth={280}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Название'} />
                  <Cell render={({ row }) => <Name template={row} />} />
                </>
              )}
            </Column>
            <Column width={176}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Активные товары'} />
                  <Cell render={({ row }) => <ProductCount template={row} kind={'active'} />} />
                </>
              )}
            </Column>
            <Column width={176}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Архивные товары'} />
                  <Cell render={({ row }) => <ProductCount template={row} kind={'archived'} />} />
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
    </div>
  );
};
