import { Page } from '@library/design';

import React from 'react';

import { Content } from './content/content.tsx';
import { Header } from './header/header.tsx';

export const ModuleView: React.FC = () => (
  <Page>
    <Page.Header>
      <Header />
    </Page.Header>
    <Page.Content>
      <Content />
    </Page.Content>
  </Page>
);
