import { Page } from '@library/design';
import { type IClassModule } from '@library/app';

import React from 'react';

export class ClassModule implements IClassModule {
  render() {
    return (
      <Page>
        <Page.Header>
          <Page.Header.Title>Дашборд</Page.Header.Title>
        </Page.Header>
        <Page.Content></Page.Content>
      </Page>
    );
  }
}
