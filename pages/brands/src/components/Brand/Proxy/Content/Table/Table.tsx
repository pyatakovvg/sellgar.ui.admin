import { BrandEntity } from '@library/domain';
// import { Table as TableComponent } from '@library/kit';
import { Table as NewTable } from '@library/table';

import React from 'react';

// import { Name } from './Name';
// import { Info } from './Info';
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
            label: 'Наименование',
            width: 100,
            renderCell(data): React.ReactNode {
              return <p style={{ width: 200 }}>{data.name}</p>;
            },
          },
          {
            label: 'Описание',
            renderCell(data): React.ReactNode {
              return <p>{data.description}</p>;
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
