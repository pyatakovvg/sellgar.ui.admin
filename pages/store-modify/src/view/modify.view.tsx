import { Page } from '@library/design';
import { Button } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';
import { useNavigate } from '@library/app';

import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateProductRequest } from '../hooks/create-product-request.hook.ts';
import { useUpdateProductRequest } from '../hooks/update-product-request.hook.ts';

import { UpdateProductStoreDto } from '../classes/store/form/dto/update-product-store.dto.ts';
import { CreateProductStoreDto } from '../classes/store/form/dto/create-product-store.dto.ts';

import { Form } from './form';

import { formSchema } from './form.schema.ts';

interface IForm {
  uuid?: string;
  count: string;
  price: string;
  variantUuid: string;
  showing: boolean;
}

export const ModifyView = () => {
  const navigate = useNavigate();
  const data = useLoaderData();

  const createRequest = useCreateProductRequest();
  const updateRequest = useUpdateProductRequest();

  const methods = useForm<IForm>({
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
        const result = await updateRequest(dto as never as UpdateProductStoreDto);

        if (result) {
          methods.reset();
        }
      } else {
        const result = await createRequest(dto as never as CreateProductStoreDto);

        if (result) {
          navigate('/store/' + result.uuid);
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
