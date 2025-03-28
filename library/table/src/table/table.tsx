import React from 'react';

import { Head } from './head';
import { Row } from './row';

import { Provider as TableProvider, context as tableContext, type IContext } from './table.context.ts';

import s from './default.module.scss';

interface ITree<T> {
  accessor: keyof T;
  defaultExpanded?: boolean;
}

interface IProps<T> {
  data: T[];
  tree?: ITree<T>;
}

interface IRowsProps<T> {
  data: T;
  tree?: ITree<T>;
  deps: number;
  index: number;
}

const Rows = <T,>(props: React.PropsWithChildren<IRowsProps<T>>) => {
  const { tree } = React.useContext<IContext<T>>(tableContext);
  const [expanded, setExpand] = React.useState(() => tree?.defaultExpanded ?? false);

  let rows: React.ReactNode[] = [];

  const handleExpand = (state: boolean) => {
    setExpand(state);
  };

  rows.push(
    <Row
      key={'row_' + props.index + '_' + props.deps}
      data={props.data as T}
      deps={props.deps}
      expanded={expanded}
      setExpand={handleExpand}
    >
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          const column = child as React.ReactElement<{
            _data: T;
          }>;

          return React.cloneElement(column, {
            _data: props.data as T,
          });
        }
        return (
          <td key={'row_' + props.index + '_' + props.deps} className={s.th}>
            Error
          </td>
        );
      })}
    </Row>,
  );

  if (expanded && !!props.tree && !!(props.data[props.tree.accessor] as T[]).length) {
    rows = [
      ...rows,
      ...(props.data[props.tree.accessor] as T[]).map((item: T, index: number) => (
        <Rows
          key={'row_' + (index + 1) * 10 + '_' + props.deps}
          data={item as T}
          deps={props.deps + 1}
          tree={props.tree}
          index={index * 10}
        >
          {props.children}
        </Rows>
      )),
    ];
  }

  return rows;
};

export const Table = <T extends Record<string, any>>(props: React.PropsWithChildren<IProps<T>>) => {
  return (
    <TableProvider
      value={
        {
          tree: props.tree,
        } as IContext<T>
      }
    >
      <div className={s.wrapper}>
        <table className={s.table}>
          <thead className={s.head}>
            <Head>
              {React.Children.map(props.children, (child, index) => {
                if (React.isValidElement(child)) {
                  const column = child as React.ReactElement<{
                    _type: string;
                  }>;

                  return React.cloneElement(column, {
                    _type: 'title',
                    key: 'th_' + index,
                  });
                }
                return (
                  <th key={'th_' + index} className={s.th}>
                    Error
                  </th>
                );
              })}
            </Head>
          </thead>
          <tbody>
            {props.data.map((item, index) => {
              return (
                <Rows key={'row_' + index} index={index} deps={0} tree={props.tree} data={item as T}>
                  {props.children}
                </Rows>
              );
            })}
          </tbody>
        </table>
      </div>
    </TableProvider>
  );
};
