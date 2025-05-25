import React from 'react';

import { context } from '../cell.context.ts';

interface IContext<T> {
  data: T;
  deps: number;
}

export const useCellData = <T>() => {
  const { data, deps } = React.useContext<IContext<T>>(context);

  return { data, deps };
};
