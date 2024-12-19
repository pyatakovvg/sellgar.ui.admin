import React from 'react';
import { observer } from 'mobx-react';

import { Content } from './Content';
import { Process } from './Process';

import { useInProcess } from '../../../hooks/in-process.hook.ts';

export const Proxy = observer(() => {
  const inProcess = useInProcess();

  if (inProcess) {
    return <Process />;
  }

  return <Content />;
});
