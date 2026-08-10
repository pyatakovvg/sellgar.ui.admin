import { Page } from '@library/design';
import * as App from '@sellgar/app';

import React from 'react';
import * as RHF from 'react-hook-form';
import * as YR from '@hookform/resolvers/yup';

import { ProductFormMapper } from '../classes/controller/product/mapper/product-form.mapper.ts';
import { ProductControllerInterface } from '../classes/controller/product/product-controller.interface.ts';

import { Content } from './content';
import { Controls } from './controls';

import * as FormSchema from './schema.ts';

import s from './default.module.scss';

const ModuleViewComponent: React.FC = () => {
  const loaderData = App.useLoaderData(ProductControllerInterface);
  const product = loaderData.product;
  const isEdit = Boolean(product?.uuid);
  const submit = App.useSubmit(ProductControllerInterface);

  const form = RHF.useForm<FormSchema.IFormData>({
    mode: 'onBlur',
    defaultValues: ProductFormMapper.toFormInput(product),
    resolver: YR.yupResolver(FormSchema.schema),
  });

  React.useEffect(() => {
    form.reset(ProductFormMapper.toFormInput(product));
  }, [form, product?.uuid, product?.version]);

  const handleSubmit = form.handleSubmit((input) => submit(input));

  return (
    <RHF.FormProvider {...form}>
      <form className={s.wrapper} onSubmit={handleSubmit}>
        <Page>
          <Page.Header>
            <Page.Header.Title>{isEdit ? 'Редактирование товара' : 'Новый товар'}</Page.Header.Title>
            <Page.Header.Controls>
              <Controls />
            </Page.Header.Controls>
          </Page.Header>
          <Page.Content>
            <Content />
          </Page.Content>
        </Page>
      </form>
    </RHF.FormProvider>
  );
};

export const ModuleView = App.reactive(ModuleViewComponent);
