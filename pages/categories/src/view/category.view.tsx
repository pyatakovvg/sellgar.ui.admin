import { Page } from '@library/design';

import React from 'react';

import { Header } from './header';
import { Content } from './content';

export const CategoryView = () => {
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
