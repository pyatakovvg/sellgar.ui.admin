import { Page } from '@library/design';

import React from 'react';

import { Header } from './header';
import { Content } from './content';
import { Modify, ModifyProvider } from './modify';
import { ModifyGroup, ModifyGroupProvider } from './modify-group';

export const PropertyView = () => {
  return (
    <ModifyGroupProvider>
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
        <ModifyGroup />
      </ModifyProvider>
    </ModifyGroupProvider>
  );
};
