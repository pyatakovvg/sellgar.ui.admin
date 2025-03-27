import { BrandEntity } from '@library/domain';
import { Table as NewTable } from '@library/table';

import React from 'react';

import { Name } from './Name';
import { Info } from './Info';
// import { CrudActions } from './CrudActions';

import s from './default.module.scss';

interface IProps {
  data: BrandEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <NewTable
        data={props.data}
        columns={[
          {
            key: 'name',
            title: 'Наименование',
            width: '280',
            Component: (cell) => {
              return <Name>{cell?.toString()}</Name>;
            },
          },
          {
            key: 'description',
            title: 'Описание',
            Component(cell) {
              return <Info>{cell?.toString()}</Info>;
            },
          },
        ]}
      />

      {/*<div className={s.container}>*/}
      {/*  <TableComponent*/}
      {/*    data={props.data}*/}
      {/*    columns={[*/}
      {/*      {*/}
      {/*        id: 'name',*/}
      {/*        size: 280,*/}
      {/*        header: 'Наименование',*/}
      {/*        cell: (cell) => <Name deps={cell.row.depth}>{cell.getValue()}</Name>,*/}
      {/*        accessorKey: 'name',*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'description',*/}
      {/*        size: 420,*/}
      {/*        accessorKey: 'description',*/}
      {/*        header: 'Описание',*/}
      {/*        enableResizing: false,*/}
      {/*        cell: (cell) => <Info>{cell.getValue()}</Info>,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        id: 'actions',*/}
      {/*        size: 48,*/}
      {/*        enableResizing: false,*/}
      {/*        header: () => false,*/}
      {/*        cell: ({ row }) => <CrudActions data={row.original} />,*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};
