import { Page, PageTitle } from '@library/design';
import { DashboardLineIcon } from '@sellgar/kit/icons';

import React from 'react';

export const ModuleView: React.FC = () => {
  return (
    <Page>
      <Page.Header>
        <PageTitle icon={<DashboardLineIcon />} size={'body-l'}>
          <h2>Дашборд</h2>
        </PageTitle>
      </Page.Header>
    </Page>
  );
};
