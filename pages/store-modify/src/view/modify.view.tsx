import { Page } from '@library/design';
import { Button } from '@sellgar/kit';
import { StoreProductEntity } from '@library/domain';
import { useNavigate, useLoaderData } from '@tiyn/app';

import React from 'react';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useProcess } from '../hooks/process.hook.ts';
import { useCurrency } from '../hooks/currency.hook.ts';

import { useCreateRequest } from '../requests/create.request.ts';
import { useUpdateRequest } from '../requests/update.request.ts';

import { Form } from './form';
import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

import { schema, IFormData } from './form.schema.ts';

export const ModifyView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const data = useLoaderData(StoreControllerInterface) as StoreProductEntity | undefined;

  const navigate = useNavigate();

  const inProcess = useProcess();
  const currency = useCurrency();

  const createRequest = useCreateRequest();
  const updateRequest = useUpdateRequest();

  const firstOffer = data?.offers?.[0];

  const methods = useForm<IFormData>({
    defaultValues: {
      article: data?.article,
      shopUuid: data?.shop.uuid,
      variantUuid: firstOffer?.variant.uuid,
      currentPrice: firstOffer?.currentPrice
        ? {
            value: firstOffer.currentPrice.value,
            currencyCode: firstOffer.currentPrice.currency.code,
          }
        : {
            currencyCode: currency[0].code,
          },
      showing: data?.showing ?? false,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = methods.handleSubmit(
    async (values) => {
      if (uuid) {
        await updateRequest({ uuid, offerUuid: firstOffer?.uuid, expectedVersion: data!.version, ...values }, async () => {
          await navigate.to('/store');
        });
      } else {
        await createRequest(values, async (result) => {
          await navigate.to('/store/' + result.uuid);
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
        <Page.Header.Title>{data ? 'Редактировать' : 'Создать'}</Page.Header.Title>
        <Page.Header.Controls>
          <Button disabled={inProcess || !methods.formState.isDirty} target={'success'} onClick={handleSubmit}>
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
