import React from 'react';
import { observer } from 'mobx-react';

import { Modify } from './Modify';
import { Process } from './Process';

import { useGetProductInProcess } from '../../../hooks/get-product-in-process.hook.ts';

export const Content = observer(() => {
  const inProcess = useGetProductInProcess();

  if (inProcess) {
    return <Process />;
  }

  return <Modify />;
});
