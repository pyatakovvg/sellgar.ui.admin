import React from 'react';
import { observer } from 'mobx-react';

import { Modify } from './Modify';
import { Process } from './Process';

import { useGetBrandInProcess } from '../../../hooks/get-brand-in-process.hook.ts';

export const Content = observer(() => {
  const inProcess = useGetBrandInProcess();

  if (inProcess) {
    return <Process />;
  }

  return <Modify />;
});
