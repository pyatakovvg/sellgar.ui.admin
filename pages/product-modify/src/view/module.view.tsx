import { Page } from '@library/design';
import { useLoaderData, useNavigate } from '@tiyn/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import * as ReactHookFormResolver from '@hookform/resolvers/yup';

import { Content } from './content';
import { Controls } from './controls';
import { ProductControllerInterface } from '../classes/controller/product-controller.interface.ts';

import { useCreate } from '../requests/create.hook.ts';
import { useUpdate } from '../requests/update.hook.ts';

import { IFormData, schema } from './schema.ts';
import { normalizeProductFormData, toProductFormData } from './form-values.ts';

export const ModuleView = () => {
  const navigate = useNavigate();
  const data = useLoaderData(ProductControllerInterface);
  const [product, setProduct] = React.useState(data);
  const isEdit = Boolean(product?.uuid);

  const methods = ReactHookForm.useForm<IFormData>({
    mode: 'onBlur',
    defaultValues: toProductFormData(data),
    resolver: ReactHookFormResolver.yupResolver(schema),
  });

  React.useEffect(() => {
    setProduct(data);
    methods.reset(toProductFormData(data));
  }, [data?.uuid]);

  const update = useUpdate();
  const create = useCreate();

  const handleSubmit = methods.handleSubmit(
    async (values: IFormData) => {
      const normalizedValues = normalizeProductFormData(values);

      if (product?.uuid) {
        const result = await update(product.uuid, {
          uuid: product.uuid,
          version: product.version,
          ...normalizedValues,
        });

        setProduct(result);
        methods.reset(toProductFormData(result));
      } else {
        const result = await create(normalizedValues);

        await navigate.to('/products/' + result?.uuid);
      }
    },
  );

  return (
    <ReactHookForm.FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Page>
          <Page.Header>
            <Page.Header.Title>{isEdit ? 'Редактирование товара' : 'Новый товар'}</Page.Header.Title>
            <Page.Header.Controls>
              <Controls inProcess={methods.formState.isSubmitting} />
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
