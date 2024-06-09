import React from 'react';
import { observer } from 'mobx-react';

import { useIsRefreshLoading } from '@/hooks/useIsRefreshLoading.ts';

import { Loading } from './Loading';
import { Content } from './Content';

export const Proxy: React.FC = observer(() => {
  const inProgress = useIsRefreshLoading();

  if (inProgress) {
    return <Loading />;
  }

  return <Content />;
});
