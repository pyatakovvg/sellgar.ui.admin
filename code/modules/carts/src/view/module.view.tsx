import React from 'react';

import { Page } from '@library/design';

import { Table } from './table';

export const ModuleView: React.FC = () => {
  return (
    <Page>
      <Page.Header>
        <Page.Header.Title>Корзины</Page.Header.Title>
      </Page.Header>
      <Page.Content>
        <Table />
      </Page.Content>
    </Page>
  );
};
