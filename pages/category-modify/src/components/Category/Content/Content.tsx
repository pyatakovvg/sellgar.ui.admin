import React from 'react';
import { observer } from 'mobx-react';

import { Modify } from './Modify';
import { Process } from './Process';

import { useDataInProcess } from '../../../hooks/get-data-in-process.hook.ts';

export const Content = observer(() => {
  const inProcess = useDataInProcess();
  console.log(inProcess);
  if (inProcess) {
    return <Process />;
  }

  return <Modify />;
});
