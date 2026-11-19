import { Page } from '@library/design';

import React from 'react';

import { Content } from './content';
import { Header } from './header';

export const ModuleView: React.FC = () => {
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
