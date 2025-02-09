import { CategoryEntity } from '@library/domain';
import { Table as TableComponent, Underlay } from '@library/kit';

import React from 'react';

import { Name } from './Name';
import { Info } from './Info';
import { CrudActions } from './CrudActions';

import s from './default.module.scss';

interface IProps {
  data: CategoryEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Underlay>
        <div className={s.container}>
          <TableComponent
            data={props.data}
            columns={[
              {
                id: 'name',
                header: 'Наименование',
                cell: (cell) => <Name deps={cell.row.depth}>{cell.getValue()}</Name>,
                accessorKey: 'name',
                size: 320,
              },
              {
                id: 'description',
                accessorKey: 'description',
                header: 'Описание',
                size: 480,
                enableResizing: false,
                cell: (cell) => <Info>{cell.getValue()}</Info>,
              },
              {
                id: 'actions',
                size: 40,
                enableResizing: false,
                header: () => false,
                cell: ({ row }) => <CrudActions data={row.original} />,
              },
            ]}
            resizing={{
              enableColumnResizing: true,
              columnResizeMode: 'onChange',
            }}
            expanded={{
              state: true,
              getSubRows: (originalRow) => originalRow.children,
              getRowCanExpand: () => true,
            }}
          />
        </div>
      </Underlay>
    </div>
  );
};
