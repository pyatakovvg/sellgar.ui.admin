import { CategoryModifyRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit';

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
        tree={{ isUse: true, accessor: 'children' }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(CategoryModifyRoute, { params: { uuid: row.uuid } }),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column width={280}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Наименование'} />
                  <Cell>
                    <Name />
                  </Cell>
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell>
                    <Description />
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
