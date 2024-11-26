import React from 'react';
import { RowData, Cell as ICell, flexRender } from '@tanstack/react-table';

import { getCommonPinningStyles } from '../table.utils.ts';

import s from './default.module.scss';

interface IProps<TData, TValue> {
  cell: ICell<TData, TValue>;
}

export const Cell = <TData extends RowData, TValue>(props: IProps<TData, TValue>) => {
  return (
    <td
      className={s.cell}
      style={{
        width: props.cell.column.getSize(),
        ...getCommonPinningStyles(props.cell.column),
      }}
    >
      <div className={s.wrapper}>{flexRender(props.cell.column.columnDef.cell, props.cell.getContext())}</div>
    </td>
  );
};
