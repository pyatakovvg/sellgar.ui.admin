import { Page } from '@library/design';

import React from 'react';

import { Header } from './header';
import { Content } from './content';
import { Modify, ModifyProvider } from './modify';

export const UnitView = () => {
  return (
    <ModifyProvider>
      <Page>
        <Page.Header>
          <Header />
        </Page.Header>
        <Page.Content>
          <Content />
        </Page.Content>
        <Modify />
      </Page>
    </ModifyProvider>
  );
};
