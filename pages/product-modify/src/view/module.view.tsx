import { Page } from '@library/design';
import { useLoaderData, useSubmit } from '@tiyn/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import * as ReactHookFormResolver from '@hookform/resolvers/yup';

import { Content } from './content';
import { Controls } from './controls';
import { ProductControllerInterface } from '../classes/controller/product-controller.interface.ts';

import { IFormData, schema } from './schema.ts';
import { normalizeProductFormData, toProductFormData } from './form-values.ts';

export const ModuleView = () => {
  const data = useLoaderData(ProductControllerInterface);
  const [product, setProduct] = React.useState(data);
  const isEdit = Boolean(product?.uuid);
  const submit = useSubmit(ProductControllerInterface);

  const methods = ReactHookForm.useForm<IFormData>({
    mode: 'onBlur',
    defaultValues: toProductFormData(data),
    resolver: ReactHookFormResolver.yupResolver(schema),
  });

  React.useEffect(() => {
    setProduct(data);
    methods.reset(toProductFormData(data));
  }, [data?.uuid, data?.version]);

  const handleSubmit = methods.handleSubmit(
    async (values: IFormData) => {
      const normalizedValues = normalizeProductFormData(values);

      if (product?.uuid) {
        const result = await submit({
          uuid: product.uuid,
          version: product.version,
          ...normalizedValues,
        });

        if (result) {
          setProduct(result);
          methods.reset(toProductFormData(result));
        }
        return;
      }

      await submit(normalizedValues);
    },
  );

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
