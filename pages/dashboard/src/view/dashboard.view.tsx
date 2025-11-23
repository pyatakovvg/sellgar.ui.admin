import { Page } from '@library/design';

import React from 'react';
import * as ReactRouter from 'react-router-dom';

export const DashboardView = () => {
  return (
    <Page>
      <Page.Header>
        <Page.Header.Title>Дашборд</Page.Header.Title>
      </Page.Header>
      <Page.Content>
        <ReactRouter.NavLink to={'/sign-in'}>SignIn</ReactRouter.NavLink>
      </Page.Content>
    </Page>
  );
};
