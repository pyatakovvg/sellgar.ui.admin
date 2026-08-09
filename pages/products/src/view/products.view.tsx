import { Page } from '@library/design';

import React from 'react';

import { Header } from './header';
import { Content } from './content';

export const ProductsView: React.FC = () => {
  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>
        <Content />
      </Page.Content>
    </Page>
  );
};
