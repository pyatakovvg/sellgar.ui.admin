import React from 'react';

import { EqualizerLineIcon } from '@sellgar/kit/icons';

import { PageTitle } from '@library/design';

export const Title: React.FC = () => {
  return (
    <PageTitle icon={<EqualizerLineIcon />}>
      <h2>Свойства</h2>
    </PageTitle>
  );
};
