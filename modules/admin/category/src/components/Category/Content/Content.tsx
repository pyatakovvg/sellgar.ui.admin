import React from 'react';
import { observer } from 'mobx-react';

import { Modify } from './Modify';
import { Process } from './Process';

import { useInProcess } from '../../../hooks/in-process.hook.ts';

export const Content = observer(() => {
  const inProcess = useInProcess();

  if (inProcess) {
    return <Process />;
  }

  return <Modify />;
});
