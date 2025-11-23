import { Page } from '@library/design';
import { Button } from '@sellgar/kit';
import { useNavigate } from '@library/app';

import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { usePresenter } from '../hooks/presenter.hook.ts';
import { useCreateProductRequest } from '../hooks/create-product-request.hook.ts';
import { useUpdateProductRequest } from '../hooks/update-product-request.hook.ts';

import { UpdateProductStoreDto } from '../classes/store/form/dto/update-product-store.dto.ts';
import { CreateProductStoreDto } from '../classes/store/form/dto/create-product-store.dto.ts';

import { Form } from './form';

import { formSchema } from './form.schema.ts';

interface IForm {
  uuid?: string;
  count: number;
  price: number;
  variantUuid: string;
  showing: boolean;
}

export const ModifyView = () => {
  const navigate = useNavigate();
  const data = useLoaderData();

  const presenter = usePresenter();

  const createRequest = useCreateProductRequest();
  const updateRequest = useUpdateProductRequest();

  const methods = useForm<IForm>({
    // @ts-ignore
    resolver: yupResolver(formSchema),
    defaultValues: data
      ? {
          uuid: data.uuid,
          variantUuid: data.variantUuid,
          // price: data.prices[0].value ?? undefined,
          count: data.count,
          showing: data.showing,
        }
      : { showing: false },
  });

  const handleSubmit = methods.handleSubmit(
    async (dto) => {
      if ('uuid' in dto) {
        const result = await updateRequest({
          ...dto,
          count: Number(dto.count),
          ...(dto.price
            ? {
                price: Number(dto.price),
              }
            : {}),
        } as never as UpdateProductStoreDto);

        if (result) {
          await presenter.getPriceHistory(dto.uuid);
          methods.reset(dto);
        }
      } else {
        const result = await createRequest({
          ...dto,
          count: Number(dto.count),
          price: Number(dto.price),
        } as never as CreateProductStoreDto);

        if (result) {
          navigate.location('/store/' + result.uuid);
        }
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
          <Button target={'success'} onClick={handleSubmit}>
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
