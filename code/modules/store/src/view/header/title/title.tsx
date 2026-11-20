import React from 'react';

import { ArchiveLineIcon } from '@sellgar/kit/icons';

import { PageTitle } from '@library/design';

export const Title: React.FC = () => {
  return (
    <PageTitle icon={<ArchiveLineIcon />}>
      <h1>Товары на складе</h1>
    </PageTitle>
  );
};
