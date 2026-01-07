import { Page } from '@library/design';
import { Button } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';
import { useNavigate, useLoaderData } from '@library/app';

import React from 'react';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useProcess } from '../hooks/process.hook.ts';

import { useCreateRequest } from '../requests/create.request.ts';
import { useUpdateRequest } from '../requests/update.request.ts';

import { Form } from './form';

import { schema, IFormData } from './form.schema.ts';

export const ModifyView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [data] = useLoaderData<[StoreEntity]>();

  const navigate = useNavigate();

  const inProcess = useProcess();

  const createRequest = useCreateRequest();
  const updateRequest = useUpdateRequest();

  const methods = useForm<IFormData>({
    defaultValues: {
      article: data?.article,
      variantUuid: data?.variantUuid,
      currentPrice: data?.currentPrice
        ? {
            value: data?.currentPrice?.value,
            currencyCode: data?.currentPrice?.currency.code,
          }
        : undefined,
      count: data?.count,
      showing: data?.showing ?? false,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = methods.handleSubmit(
    async (values) => {
      if (uuid) {
        await updateRequest({ uuid, ...values }, async (result) => {
          methods.reset(result);
        });
      } else {
        await createRequest(values, async (result) => {
          navigate.location('/store/' + result.uuid);
        });
      }
    },
    (error) => {
      console.log('error', error);
    },
  );

  return (
    <Page>
      <Page.Header>
        <Page.Header.Title>{data ? 'Редактировать' : 'Создать'}</Page.Header.Title>
        <Page.Header.Controls>
          <Button disabled={inProcess} target={'success'} onClick={handleSubmit}>
            Сохранить
          </Button>
        </Page.Header.Controls>
      </Page.Header>
      <Page.Content>
        <FormProvider {...methods}>
          <Form />
        </FormProvider>
      </Page.Content>
    </Page>
  );
};
