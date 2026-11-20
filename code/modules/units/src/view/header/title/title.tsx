import React from 'react';

import { RulerLineIcon } from '@sellgar/kit/icons';

import { PageTitle } from '@library/design';

export const Title: React.FC = () => {
  return (
    <PageTitle icon={<RulerLineIcon />}>
      <h2>Единица измерения</h2>
    </PageTitle>
  );
};
