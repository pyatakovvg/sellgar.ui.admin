import React from 'react';

import { NodeTreeIcon } from '@sellgar/kit/icons';

import { PageTitle } from '@library/design';

export const Title: React.FC = () => {
  return (
    <PageTitle icon={<NodeTreeIcon />} description={'Дерево категорий магазина'}>
      <h2>Категории</h2>
    </PageTitle>
  );
};
