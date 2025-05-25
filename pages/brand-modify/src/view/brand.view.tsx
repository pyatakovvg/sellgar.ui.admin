import { Page } from '@library/design';
import { BrandEntity, CreateBrandDto } from '@library/domain';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useLoaderData } from 'react-router-dom';

import { Controls } from './controls';
import { Content } from './content';

import { schema } from './schema.ts';

interface IForm extends CreateBrandDto {}

export const BrandView = () => {
  const data = useLoaderData<BrandEntity>();
  const params = useParams();

  const methods = useForm<IForm>({ defaultValues: data, resolver: yupResolver(schema) });

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
