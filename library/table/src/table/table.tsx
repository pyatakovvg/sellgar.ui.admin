import React from 'react';

import {
  Table as TableComponent,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  type TableNode,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

import { Title } from './title';

import s from './default.module.scss';

interface IColumnProps<T> {
  label: string;
  width?: number;
  renderCell(data: T): React.ReactNode;
}

interface IProps<T> {
  data: T[];
  columns: IColumnProps<T>[];
}

export const Table = <T,>(props: IProps<T>) => {
  const theme = useTheme([
    {
      Table: ``,
      HeaderRow: `
        background-color: var(--background-surface-neutral);
      `,
      HeaderCell: `
        border-bottom: var(--numbers-1) solid var(--border-action-normal);
      `,
      Row: `
        &:not(:last-of-type) > .td {
          border-bottom: var(--numbers-1) solid var(--border-action-normal);
        }
      `,
      Cell: `
        padding: var(--numbers-4) var(--numbers-12);
        background: var(--background-surface-default);
      `,
    },
  ]);

  return (
    <TableComponent
      className={s.wrapper}
      data={{ nodes: props.data }}
      layout={{ isDiv: false, fixedHeader: true }}
      resizedLayout={''}
      theme={theme}
    >
      {(dataItem: T[]) => (
        <>
          <Header>
            <HeaderRow>
              {props.columns.map((column, indexColumn) => {
                return (
                  <HeaderCell key={`${indexColumn}`} className={s.head} stiff={false}>
                    <Title>{column.label}</Title>
                  </HeaderCell>
                );
              })}
            </HeaderRow>
          </Header>

          <Body>
            {dataItem.map((item, indexRow) => {
              return (
                <Row key={indexRow} item={item as TableNode}>
                  {props.columns.map((column, indexCell) => {
                    return <Cell key={`${indexRow}_${indexCell}`}>{column.renderCell(item)}</Cell>;
                  })}
                </Row>
              );
            })}
          </Body>
        </>
      )}
    </TableComponent>
  );
};
