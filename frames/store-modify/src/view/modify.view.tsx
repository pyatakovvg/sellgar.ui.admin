import { Page } from '@library/design';
import { Drawer, Button } from '@sellgar/kit';
import { StoreProductEntity } from '@library/domain';
import { useFrame, useLoaderData, useNavigate } from '@tiyn/app';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useProcess } from '../hooks/process.hook.ts';
import { useCurrency } from '../hooks/currency.hook.ts';

import { useCreateRequest } from '../requests/create.request.ts';
import { useUpdateRequest } from '../requests/update.request.ts';

import { Form } from './form';

import { schema, IFormData } from './form.schema.ts';
import { StoreControllerInterface } from '../classes/controller/store-controller.interface.ts';

export const ModifyView = () => {
  const data = useLoaderData(StoreControllerInterface) as StoreProductEntity | undefined;

  const navigate = useNavigate();
  const frame = useFrame();

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
      if (data) {
        await updateRequest({ uuid: data.uuid, offerUuid: firstOffer?.uuid, expectedVersion: data.version, ...values }, async () => {
          await frame.close();
          await navigate.to('/store');
        });
      } else {
        await createRequest(values, async (result) => {
          await frame.close();
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
