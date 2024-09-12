import React from 'react';
import { observer } from 'mobx-react';

import { useIsLoading } from '@/hooks/useIsLoading.ts';

import { Loading } from './Loading';
import { FormModify } from './ShopModify/FormModify';

import { useShop } from '@/hooks/useShop.ts';

export const Content = observer(() => {
  const isLoading = useIsLoading();
  const shop = useShop();

  if (isLoading) {
    return <Loading />;
  }

  return <FormModify shop={shop} onSubmit={() => {}} />;
});
