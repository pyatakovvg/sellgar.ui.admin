import { Page } from '@library/design';
import { CategoryEntity } from '@library/domain';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useLoaderData, useParams } from 'react-router-dom';

import { schema } from './schema.ts';

import { Content } from './content';
import { Controls } from './controls';

export const CategoryView = () => {
  const data = useLoaderData<CategoryEntity>() ?? new CategoryEntity();
  const params = useParams();

  const methods = useForm<CategoryEntity>({
    defaultValues: data,
    resolver: yupResolver(schema) as any,
  });

  return (
    <FormProvider {...methods}>
      <Page>
        <Page.Header>
          <Page.Header.Title>{params.uuid ? 'Редактировать' : 'Создать'}</Page.Header.Title>
          <Page.Header.Controls>
            <Controls />
          </Page.Header.Controls>
        </Page.Header>
        <Page.Content>
          <Content />
        </Page.Content>
      </Page>
    </FormProvider>
  );
};
