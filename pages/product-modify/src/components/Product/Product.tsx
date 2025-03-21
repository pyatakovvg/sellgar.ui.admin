import { Page } from '@library/design';
import { TabMenu } from '@sellgar/kit';

import React from 'react';

import { Content } from './Content';

import { useGetParams } from '../../hooks/get-params.hook.ts';

export const Product = () => {
  const params = useGetParams();

  return (
    <TabMenu defaultTabName={'common'} size={'sm'} type={'segmented'}>
      <Page>
        <Page.Header>
          <Page.Header.Title>{params.uuid ? 'Редактировать' : 'Создать'}</Page.Header.Title>
        </Page.Header>
        <Page.Menu>
          <TabMenu.Menu>
            <TabMenu.Menu.Tab title={'Основные'} name={'common'} />
            <TabMenu.Menu.Tab title={'Варианты'} name={'variants'} />
            <TabMenu.Menu.Tab title={'Свойства'} name={'properties'} />
            <TabMenu.Menu.Tab title={'Описание'} name={'description'} />
          </TabMenu.Menu>
        </Page.Menu>
        <Page.Content>
          <Content />
        </Page.Content>
      </Page>
    </TabMenu>
  );
};
