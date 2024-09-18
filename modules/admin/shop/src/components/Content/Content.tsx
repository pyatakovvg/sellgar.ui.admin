import React from 'react';
import { observer } from 'mobx-react';

import { useShop } from '@/hooks/useShop.ts';
import { useIsLoading } from '@/hooks/useIsLoading.ts';

import { context } from '../../shop.context.ts';

import { Loading } from './Loading';
import { FormModify } from './ShopModify/FormModify';

export const Content = observer(() => {
  const isLoading = useIsLoading();
  const shop = useShop();
  const { presenter } = React.useContext(context);

  if (isLoading) {
    return <Loading />;
  }

  return <FormModify shop={shop} onSubmit={(data) => presenter.upsert(data)} />;
});
