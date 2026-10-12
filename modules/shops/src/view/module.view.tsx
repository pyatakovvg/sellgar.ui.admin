import { Page } from '@library/design';

import React from 'react';

import { Content } from './content';
import { Filter } from './filter';
import { Header } from './header';

export const ModuleView: React.FC = () => {
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
