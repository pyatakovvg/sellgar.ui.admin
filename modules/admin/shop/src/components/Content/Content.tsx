import { useChangeBreadcrumb } from '@library/breadcrumbs';

import React from 'react';
import { observer } from 'mobx-react';

import { useShop } from '@/hooks/useShop.ts';
import { useIsLoading } from '@/hooks/useIsLoading.ts';

import { context } from '../../shop.context.ts';

import { Loading } from './Loading';
import { FormModify } from './ShopModify/FormModify';

export const Content = observer(() => {
  const changeBreadcrumb = useChangeBreadcrumb();
  const isLoading = useIsLoading();
  const shop = useShop();

  const { presenter } = React.useContext(context);

  React.useEffect(() => {
    if (shop) {
      changeBreadcrumb('EDIT_SHOP_CRUMB', shop.name);
    }
  }, [shop]);

  if (isLoading || !shop) {
    return <Loading />;
  }

  return <FormModify shop={shop} onSubmit={(data) => presenter.upsert(data)} />;
});
