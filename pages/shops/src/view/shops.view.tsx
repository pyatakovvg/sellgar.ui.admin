import { Page } from '@library/design';

import React from 'react';

import { Header } from './header';
import { Filter } from './filter';
import { Content } from './content';

export const ShopsView: React.FC = () => {
  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Filter>
        <Filter />
      </Page.Filter>
      <Page.Content>
        <Content />
      </Page.Content>
    </Page>
  );
};
