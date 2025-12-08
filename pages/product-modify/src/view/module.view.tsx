import { Page } from '@library/design';
import { useLoaderData, useNavigate } from '@library/app';
import { ProductEntity } from '@library/domain';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import * as ReactHookFormResolver from '@hookform/resolvers/yup';

import { Content } from './content';
import { Controls } from './controls';

import { useCreate } from '../requests/create.hook.ts';
import { useUpdate } from '../requests/update.hook.ts';

import { IFormData, schema } from './schema.ts';

export const ModuleView = () => {
  const navigate = useNavigate();
  const [data] = useLoaderData<[ProductEntity]>();

  const methods = ReactHookForm.useForm<IFormData>({
    mode: 'onBlur',
    defaultValues: data ?? new ProductEntity(),
    resolver: ReactHookFormResolver.yupResolver(schema),
  });

  const update = useUpdate();
  const create = useCreate();

  const handleSubmit = methods.handleSubmit(
    async (values: IFormData) => {
      if (data?.uuid) {
        const result = await update(data.uuid, {
          uuid: data.uuid,
          ...values,
        });

        methods.reset(result);
      } else {
        const result = await create(values);

        navigate.location('/products/' + result?.uuid);
      }
    },
    (errors) => console.log(errors),
  );

  // React.useEffect(() => {
  console.log(123, methods.formState.isDirty);
  // }, [methods.formState]);

  return (
    <ReactHookForm.FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Page>
          <Page.Header>
            <Page.Header.Title>Новый товар</Page.Header.Title>
            <Page.Header.Controls>
              <Controls />
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
