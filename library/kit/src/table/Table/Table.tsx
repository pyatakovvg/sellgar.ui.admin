import React from 'react';
import {
  useReactTable,
  RowData,
  ColumnResizeMode,
  getExpandedRowModel,
  ColumnDef,
  Row,
  getCoreRowModel,
  ExpandedState,
  OnChangeFn,
} from '@tanstack/react-table';

import { Header } from './Header';
import { Cell } from './Cell';

import s from './default.module.scss';

interface IExpanded<TData> {
  state?: ExpandedState;
  colSpan?: number;
  getRowCanExpand?: ((row: Row<TData>) => boolean) | undefined;
  getSubRows?: (originalRow: TData, index: number) => TData[] | undefined;
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  onExpandedChange?: OnChangeFn<ExpandedState>;
}

interface IColumnResizing {
  enableColumnResizing?: boolean;
  columnResizeMode?: ColumnResizeMode;
}

interface IProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  expanded?: IExpanded<TData>;
  resizing?: IColumnResizing;
  debugTable?: boolean;
  debugHeaders?: boolean;
  debugColumns?: boolean;
}

export const Table = <TData extends RowData>(props: React.PropsWithChildren<IProps<TData>>) => {
  const table = useReactTable<TData>({
    data: props.data,
    columns: props.columns,
    debugTable: props.debugTable,
    debugHeaders: props.debugHeaders,
    debugColumns: props.debugColumns,
    state: {
      expanded: props.expanded?.state,
    },
    getSubRows: props.expanded?.getSubRows,
    getRowCanExpand: props.expanded?.getRowCanExpand,
    onExpandedChange: props.expanded?.onExpandedChange,

    columnResizeMode: props.resizing?.columnResizeMode,
    enableColumnResizing: props.resizing?.enableColumnResizing,

    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  React.useEffect(() => {
    table.getToggleAllRowsSelectedHandler();
  }, []);

  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <thead className={s.header}>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <Header key={header.id} header={header} />;
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className={s.row}>
                {row.getVisibleCells().map((cell) => {
                  return <Cell key={cell.id} cell={cell} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
