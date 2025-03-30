import React from 'react';

import { context } from '../cell.context.ts';

export const useCellData = () => {
  const { data, deps } = React.useContext(context);

  return { data, deps };
};
