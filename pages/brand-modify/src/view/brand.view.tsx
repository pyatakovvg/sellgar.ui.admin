import { Page } from '@library/design';
import { BrandEntity } from '@library/domain';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useLoaderData } from 'react-router-dom';

import { Form } from './form';
import { Controls } from './controls';

import { schema } from './schema.ts';

interface IParams {
  readonly uuid?: string;
}

interface IForm {
  code: string;
  name: string;
  description: string;
}

export const BrandView = () => {
  const data = useLoaderData<BrandEntity>();
  const params = useParams() as unknown as IParams;

  const methods = useForm<IForm>({ defaultValues: data, resolver: yupResolver<IForm>(schema) });

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
          <Form />
        </Page.Content>
      </Page>
    </FormProvider>
  );
};
