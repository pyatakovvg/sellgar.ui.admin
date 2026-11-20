import React from 'react';

import { Page, PageTitle } from '@library/design';
import { ShoppingCartLineIcon } from '@sellgar/kit/icons';

import { Table } from './table';

export const ModuleView: React.FC = () => {
  return (
    <Page>
      <Page.Header>
        <PageTitle icon={<ShoppingCartLineIcon />} size={'body-l'}>
          <h2>Корзины</h2>
        </PageTitle>
      </Page.Header>
      <Page.Content>
        <Table />
      </Page.Content>
    </Page>
  );
};
