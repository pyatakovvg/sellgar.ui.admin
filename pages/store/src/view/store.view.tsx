import { Page } from '@library/design';
import { Button, Icon } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import { Content } from './content';

export const StoreView = () => {
  return (
    <Page>
      <Page.Header>
        <Page.Header.Title>Склад</Page.Header.Title>
        <Page.Header.Controls>
          <NavLink to={'/store/create'}>
            <Button size={'sm'} leadIcon={<Icon icon={'add-line'} />}>
              Добавить товар
            </Button>
          </NavLink>
        </Page.Header.Controls>
      </Page.Header>
      <Page.Content>
        <Content />
      </Page.Content>
    </Page>
  );
};
