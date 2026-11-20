import React from 'react';

import { ShoppingBag3LineIcon } from '@sellgar/kit/icons';

import { PageTitle } from '@library/design';

export const Title: React.FC = () => {
  return (
    <PageTitle icon={<ShoppingBag3LineIcon />}>
      <h2>Товары</h2>
    </PageTitle>
  );
};
