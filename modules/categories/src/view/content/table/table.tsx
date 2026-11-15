import { CategoryModifyRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit/table';

import React from 'react';

import { CategoryControllerInterface } from '../../../classes/controller/category/category-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

const TableView: React.FC = () => {
  const { tree } = App.useLoaderData(CategoryControllerInterface);
  const revalidate = App.useRevalidate();
  const navigate = App.useNavigate();

  if (!tree) return <p className={s.empty}>Добавьте магазин, чтобы организовать его категории.</p>;

  return (
    <div className={s.wrapper}>
      <TableComponent
        loading={revalidate.inProcess}
        size={'md'}
        data={{ nodes: tree.nodes }}
        row={{
          handlers: { click: ({ row }) => void navigate.to(CategoryModifyRoute, { params: { uuid: row.uuid } }) },
        }}
        tree={{ isUse: true, accessor: (row) => row.children, defaultExpanded: true }}
      >
        {({ Column }) => (
          <>
            <Column width={320} minWidth={280} resizable={true}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Категория'} />
                  <Cell
                    render={({ row, node, TreeTrigger }) => (
                      <div className={s.name}>
                        {Array.from({ length: node.depth }, (_, depth) => (
                          <span key={depth} className={s.indentation} aria-hidden={true} />
                        ))}
                        <span className={s.trigger}>{node.hasChildren ? <TreeTrigger /> : null}</span>
                        <Name category={row} />
                      </div>
                    )}
                  />
                </>
              )}
            </Column>
            <Column maxWidth={340}>
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

export const Table = App.reactive(TableView);
