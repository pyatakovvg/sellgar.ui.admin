import React from 'react';
import { observer } from 'mobx-react';

import { useIsLoading } from '@/hooks/useIsLoading.ts';

import { Loading } from './Loading';
import { UserModify } from './UserModify';

export const Content: React.FC = observer(() => {
  const isLoading = useIsLoading();

  if (isLoading) {
    return <Loading />;
  }

  return <UserModify />;
});
