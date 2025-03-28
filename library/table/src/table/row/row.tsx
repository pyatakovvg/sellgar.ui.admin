import React from 'react';

import { context as tableContext, type IContext } from '../table.context.ts';
import { Provider, type IColumn } from './row.context.ts';

import s from './default.module.scss';

interface IProps<T> {
  data: T;
  deps: number;
  expanded: boolean;
  setExpand(state: boolean): void;
}

export const Row = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const { tree } = React.useContext<IContext<T>>(tableContext);

  const childrenTree = !!tree && !!tree.accessor ? (props.data[tree.accessor as keyof T] as T[]) : [];
  const hasExpanded = childrenTree.length > 0;

  return (
    <Provider
      value={
        {
          hasExpanded,
          deps: props.deps,
          data: props.data as T,
          expanded: props.expanded,
          setExpand: props.setExpand,
        } as IColumn<T>
      }
    >
      <tr className={s.wrapper}>{props.children}</tr>
    </Provider>
  );
};
