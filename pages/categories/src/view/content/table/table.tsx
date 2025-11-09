import { CategoryEntity } from '@library/domain';
import { Table as TableComponent, Column } from '@sellgar/kit';

import React from 'react';

import { Name } from './name';
import { Info } from './info';
import { Actions } from './actions';

import s from './default.module.scss';

interface IProps {
  data: CategoryEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <TableComponent data={props.data} tree={{ accessor: 'children', defaultExpanded: true }}>
        <Column width={280} accessor={'name'}>
          <Column.Title>Наименование</Column.Title>
          <Column.Cell>
            <Name />
          </Column.Cell>
        </Column>
        <Column accessor={'description'}>
          <Column.Title>Описание</Column.Title>
          <Column.Cell>
            <Info />
          </Column.Cell>
        </Column>
        <Column width={100}>
          <Column.Cell>
            <Actions />
          </Column.Cell>
        </Column>
      </TableComponent>
    </div>
  );
};
