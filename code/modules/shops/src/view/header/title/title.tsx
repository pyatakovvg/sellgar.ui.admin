import React from 'react';

import { StoreLineIcon } from '@sellgar/kit/icons';

import { PageTitle } from '@library/design';

export const Title: React.FC = () => {
  return (
    <PageTitle icon={<StoreLineIcon />}>
      <h2>Магазины</h2>
    </PageTitle>
  );
};
