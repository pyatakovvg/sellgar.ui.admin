import { Page } from '@library/design';

import React from 'react';

import { Proxy } from './Proxy';
import { Header } from './Header';

export const Category = () => {
  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>
        <Proxy />
      </Page.Content>
    </Page>
  );
};
