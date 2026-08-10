import { CategoryModifyFrame } from '@frame/category-modify';
import * as App from '@sellgar/app';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { CategoryControllerInterface } from '../../../classes/controller/category/category-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const categories = App.useLoaderData(CategoryControllerInterface);
  const categoryModifyFrame = App.useFrame(CategoryModifyFrame);

  return (
    <div className={s.wrapper}>
      <TableComponent
        size={'md'}
        data={{ nodes: categories.data }}
        tree={{ isUse: true, accessor: 'children' }}
        row={{
          handlers: {
            click: ({ row }) => void categoryModifyFrame.open({ uuid: row.uuid }),
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
