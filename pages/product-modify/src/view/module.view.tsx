import { Page } from '@library/design';
import { useLoaderData, useSubmit } from '@sellgar/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import * as ReactHookFormResolver from '@hookform/resolvers/yup';

import { Content } from './content';
import { Controls } from './controls';
import { ProductControllerInterface } from '../classes/controller/product-controller.interface.ts';

import { IFormData, schema } from './schema.ts';
import { toProductFormData } from './form-values.ts';

export const ModuleView = () => {
  const product = useLoaderData(ProductControllerInterface);
  const isEdit = Boolean(product?.uuid);
  const submit = useSubmit(ProductControllerInterface);

  const methods = ReactHookForm.useForm<IFormData>({
    mode: 'onBlur',
    defaultValues: toProductFormData(product),
    resolver: ReactHookFormResolver.yupResolver(schema),
  });

  React.useEffect(() => {
    methods.reset(toProductFormData(product));
  }, [product?.uuid, product?.version]);

  const handleSubmit = methods.handleSubmit(async (values: IFormData) => {
    if (product?.uuid) {
      const result = await submit({
        uuid: product.uuid,
        version: product.version,
        ...values,
      });

      if (result) {
        methods.reset(toProductFormData(result));
      }
      return;
    }

    await submit(values);
  });

  return (
    <ReactHookForm.FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Page>
          <Page.Header>
            <Page.Header.Title>{isEdit ? 'Редактирование товара' : 'Новый товар'}</Page.Header.Title>
            <Page.Header.Controls>
              <Controls inProcess={submit.inProcess} />
            </Page.Header.Controls>
          </Page.Header>
          <Page.Content>
            <Content />
          </Page.Content>
        </Page>
      </form>
    </ReactHookForm.FormProvider>
  );
};
