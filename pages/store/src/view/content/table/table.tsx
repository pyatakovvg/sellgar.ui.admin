import { ProductEntity } from '@library/domain';
import { Table as TableComponent, Column } from '@sellgar/kit';

import React from 'react';

import { Name } from './name';
import { Actions } from './actions';
import { Category } from './category';
import { Price } from './price';

import s from './default.module.scss';

interface IProps {
  data: ProductEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <TableComponent data={props.data}>
        <Column>
          <Column.Title>Описание</Column.Title>
          <Column.Cell>
            <Name />
          </Column.Cell>
        </Column>
        <Column>
          <Column.Title>Категория</Column.Title>
          <Column.Cell>
            <Category />
          </Column.Cell>
        </Column>
        <Column>
          <Column.Title>Цена</Column.Title>
          <Column.Cell>
            <Price />
          </Column.Cell>
        </Column>
        <Column width={80}>
          <Column.Cell>
            <Actions />
          </Column.Cell>
        </Column>
      </TableComponent>
    </div>
  );
};
