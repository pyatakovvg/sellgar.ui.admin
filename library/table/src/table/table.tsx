import { Typography } from '@sellgar/kit';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { html, Row } from 'gridjs';
import { Grid } from 'gridjs-react';
import type { TData, TColumn, TCell } from 'gridjs/dist/src/types';

import s from './default.module.scss';

interface IColumn<T> {
  key?: keyof T;
  title?: string;
  width?: string;
  hidden?: boolean;
  columns?: IColumn<T>[];
  Component?(cell?: TCell, row?: Row, column?: TColumn): React.ReactElement | null;
}

interface IProps<T> {
  data: T[];
  columns: IColumn<T>[];
}

export const Table = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const columns = React.useMemo<TColumn[]>(() => {
    return props.columns.map<TColumn>((col) => {
      return {
        id: col.key as string,
        name: col.title,
        width: col?.width ?? 'auto',
        hidden: col.hidden,
        columns: col.columns,
        formatter: (cell, row, column) => {
          if (col.Component) {
            return html(ReactDOM.renderToString(<>{col.Component(cell, row, column)}</>), 'div');
          }
          return html(
            ReactDOM.renderToString(
              <Typography size={'caption-m'} weight={'medium'}>
                <p>{cell?.toString()}</p>
              </Typography>,
            ),
            'div',
          );
        },
      };
    });
  }, [props.columns]);

  return (
    <Grid
      className={{
        table: s.wrapper,
        thead: s.head,
        tbody: s.tbody,
        tr: s.tr,
        th: s.th,
        td: s.td,
      }}
      data={props.data as TData}
      columns={columns}
      sort={false}
      resizable={false}
    />
  );
};
