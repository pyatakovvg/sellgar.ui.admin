import { Page } from '@library/design';

import React from 'react';

import { Header } from './header';
import { Content } from './content';
import { ModifyProvider, Modify } from './modify';

export const CategoryView = () => {
  return (
    <ModifyProvider>
      <Page>
        <Page.Header>
          <Header />
        </Page.Header>
        <Page.Content>
          <Content />
        </Page.Content>
      </Page>
      <Modify />
    </ModifyProvider>
  );
};
