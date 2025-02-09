import { PropertyEntity } from '@library/domain';
import { Table as TableComponent, Underlay } from '@library/kit';

import React from 'react';

import { Name } from './Name';
import { Info } from './Info';
import { CrudActions } from './CrudActions';

import s from './default.module.scss';

interface IProps {
  data: PropertyEntity[];
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
                cell: (cell) => <Name>{cell.getValue()}</Name>,
                accessorKey: 'name',
                size: 320,
              },
              {
                id: 'description',
                accessorKey: 'description',
                header: 'Описание',
                size: 360,
                enableResizing: false,
                cell: (cell) => <Info>{cell.getValue()}</Info>,
              },
              {
                id: 'unit',
                accessorKey: 'unit',
                header: 'Ед. изм.',
                size: 120,
                enableResizing: false,
                cell: (cell) => <Info>{cell.getValue()?.name}</Info>,
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
          />
        </div>
      </Underlay>
    </div>
  );
};
