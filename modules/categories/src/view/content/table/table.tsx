import { CategoryModifyRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { CategoryControllerInterface } from '../../../classes/controller/category/category-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const categories = App.useLoaderData(CategoryControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        size={'md'}
        data={{ nodes: categories.data }}
        layout={{ scroll: 'external', virtualization: true }}
        tree={{ isUse: true, accessor: (row) => row.children }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(CategoryModifyRoute, { params: { uuid: row.uuid } }),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column key={'tree'} width={40}>
              {({ Cell }) => <Cell render={({ node, TreeTrigger }) => (node.hasChildren ? <TreeTrigger /> : null)} />}
            </Column>
            <Column key={'name'} width={280}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Наименование'} />
                  <Cell render={({ row, node }) => <Name category={row} depth={node.depth} />} />
                </>
              )}
            </Column>
            <Column key={'description'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell render={({ row }) => <Description category={row} />} />
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
    </div>
  );
};
