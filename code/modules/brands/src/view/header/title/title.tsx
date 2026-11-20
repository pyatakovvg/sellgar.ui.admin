import React from 'react';

import { CopyrightLineIcon } from '@sellgar/kit/icons';

import { PageTitle } from '@library/design';

export const Title: React.FC = () => {
  return (
    <PageTitle icon={<CopyrightLineIcon />}>
      <h2>Бренды</h2>
    </PageTitle>
  );
};
