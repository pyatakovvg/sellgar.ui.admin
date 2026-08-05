import { CategoryEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';
import { CategoryModifyFrame } from '@frame/category-modify';
import { useFrame } from '@sellgar/app';

import React from 'react';

import { Name } from './name';
import { Info } from './info';

import s from './default.module.scss';

interface IProps {
  data: CategoryEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  const frame = useFrame(CategoryModifyFrame);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: props.data }}
        tree={{ isUse: true, accessor: 'children' }}
        row={{
          handlers: {
            click: ({ row }) => void frame.open({ uuid: row.uuid }),
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
                    <Info />
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
