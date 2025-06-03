import { StoreEntity } from '@library/domain';
import { Table as TableComponent, Column } from '@sellgar/kit';

import React from 'react';

import { Price } from './price';
import { Count } from './count';
import { Product } from './product';
import { Variant } from './variant';
import { Showing } from './showing';
import { Actions } from './actions';

import s from './default.module.scss';

interface IProps {
  data: StoreEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <TableComponent data={props.data}>
        <Column accessor={'variant'}>
          <Column.Title>Товар</Column.Title>
          <Column.Cell>
            <Product />
          </Column.Cell>
        </Column>
        <Column accessor={'variant'}>
          <Column.Title>Вариант</Column.Title>
          <Column.Cell>
            <Variant />
          </Column.Cell>
        </Column>
        <Column width={80} align={'center'}>
          <Column.Title>Кол-во</Column.Title>
          <Column.Cell>
            <Count />
          </Column.Cell>
        </Column>
        <Column width={120} align={'right'}>
          <Column.Title>Цена</Column.Title>
          <Column.Cell>
            <Price />
          </Column.Cell>
        </Column>
        <Column width={120} align={'center'}>
          <Column.Title>На витрине</Column.Title>
          <Column.Cell>
            <Showing />
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
