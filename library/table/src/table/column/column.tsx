import React from 'react';

import { Title } from '../title';
import { Cell } from '../cell';

import { Provider, type IColumn } from './column.context.ts';

interface IProps<T> {
  accessor?: keyof T;
  width?: number;
}

interface IHiddenProps {
  _type?: 'title';
}

const ColumnComponent = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const [width, setWidth] = React.useState(0);

  const titleChild = React.useMemo(
    () =>
      React.Children.toArray(props.children).find((child) => {
        if (React.isValidElement(child)) {
          return child.type === Title;
        }
        return false;
      }),
    [props.children],
  );

  const cellChild = React.useMemo(
    () =>
      React.Children.toArray(props.children).find((child) => {
        if (React.isValidElement(child)) {
          return child.type === Cell;
        }
        return false;
      }),
    [props.children],
  );

  const columnPropsWithHidden = props as IProps<T> & IHiddenProps;

  if (columnPropsWithHidden._type === 'title') {
    return titleChild ? (
      <Provider
        value={
          {
            setWidth,
            dynamicWidth: width,
            width: props.width,
            accessor: props.accessor,
          } as IColumn<T>
        }
      >
        {titleChild}
      </Provider>
    ) : (
      <th style={{ width: props.width }} />
    );
  }

  return cellChild ? (
    <Provider
      value={
        {
          setWidth,
          width: props.width,
          dynamicWidth: width,
          accessor: props.accessor,
        } as IColumn<T>
      }
    >
      {cellChild}
    </Provider>
  ) : (
    <td />
  );
};

type TColumn = typeof ColumnComponent & {
  Title: typeof Title;
  Cell: typeof Cell;
};

export const Column: TColumn = Object.assign(ColumnComponent, {
  Title,
  Cell,
});
