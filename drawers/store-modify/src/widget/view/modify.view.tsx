import { Page } from '@library/design';
import { Drawer, Button } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';
import { useNavigate, useWidgetLoaderData } from '@library/app';

import React from 'react';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useProcess } from '../hooks/process.hook.ts';
import { useCurrency } from '../hooks/currency.hook.ts';

import { useCreateRequest } from '../requests/create.request.ts';
import { useUpdateRequest } from '../requests/update.request.ts';

import { Form } from './form';

import { schema, IFormData } from './form.schema.ts';

export const ModifyView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [data] = useWidgetLoaderData<[StoreEntity]>();

  const navigate = useNavigate();

  const inProcess = useProcess();
  const currency = useCurrency();

  const createRequest = useCreateRequest();
  const updateRequest = useUpdateRequest();

  const methods = useForm<IFormData>({
    defaultValues: {
      article: data?.article,
      shopUuid: data?.shopUuid,
      variantUuid: data?.variantUuid,
      currentPrice: data?.currentPrice
        ? {
            value: data?.currentPrice?.value,
            currencyCode: data?.currentPrice?.currency.code,
          }
        : {
            currencyCode: currency[0].code,
          },
      count: data?.count,
      showing: data?.showing ?? false,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = methods.handleSubmit(
    async (values) => {
      if (uuid) {
        await updateRequest({ uuid, ...values }, async () => {
          navigate.location('/store');
        });
      } else {
        await createRequest(values, async (result) => {
          navigate.location('/store/' + result.uuid);
        });
      }
    },
    (error) => {
      console.log(123, 'error', error);
    },
  );

  return (
    <Page>
      <Page.Header>
        <Page.Header.Title>Товар на складе</Page.Header.Title>
        <Page.Header.Controls>
          <Drawer.Close />
        </Page.Header.Controls>
      </Page.Header>
      <Page.Content>
        <FormProvider {...methods}>
          <Form />
        </FormProvider>
      </Page.Content>
      <Page.Controls>
        <Button disabled={inProcess || !methods.formState.isDirty} target={'success'} onClick={handleSubmit}>
          Сохранить
        </Button>
      </Page.Controls>
    </Page>
  );
};
