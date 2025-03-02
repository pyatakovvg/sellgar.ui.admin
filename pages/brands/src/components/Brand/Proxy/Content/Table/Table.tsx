import { BrandEntity } from '@library/domain';
import { Table as TableComponent, Underlay } from '@library/kit';

import React from 'react';

import { Name } from './Name';
import { Info } from './Info';
import { CrudActions } from './CrudActions';

import s from './default.module.scss';

interface IProps {
  data: BrandEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <TableComponent
          data={props.data}
          columns={[
            {
              id: 'name',
              size: 280,
              header: 'Наименование',
              cell: (cell) => <Name deps={cell.row.depth}>{cell.getValue()}</Name>,
              accessorKey: 'name',
            },
            {
              id: 'description',
              size: 420,
              accessorKey: 'description',
              header: 'Описание',
              enableResizing: false,
              cell: (cell) => <Info>{cell.getValue()}</Info>,
            },
            {
              id: 'actions',
              size: 48,
              enableResizing: false,
              header: () => false,
              cell: ({ row }) => <CrudActions data={row.original} />,
            },
          ]}
        />
      </div>
    </div>
  );
};
