import { PropertyEntity } from '@library/domain';
import { useAwaitLoaderData } from '@library/app';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Header } from './header';
import { Content } from './content';
import { Controls } from './controls';

import { useCreateRequest } from '../../requests/create.request.ts';
import { useUpdateRequest } from '../../requests/update.request.ts';

import { schema, IFormData } from './schema.ts';
import { context } from '../../widget.context.tsx';

import s from './modify.module.scss';

export const Modify = () => {
  const data = useAwaitLoaderData<PropertyEntity>();

  const { onSuccess, onCancel } = React.useContext(context);

  const createRequest = useCreateRequest();
  const updateRequest = useUpdateRequest();

  const methods = useForm<IFormData>({ mode: 'onChange', defaultValues: data, resolver: yupResolver(schema) });

  const handleSubmit = async (values: IFormData) => {
    if (data) {
      await updateRequest(data.uuid, {
        uuid: data.uuid,
        name: values.name,
        description: values.description,
      });
    } else {
      await createRequest({
        name: values.name,
        description: values.description,
      });
    }

    onSuccess();
  };

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <FormProvider {...methods}>
      <form className={s.wrapper} onSubmit={methods.handleSubmit(handleSubmit)} onReset={handleReset}>
        <div className={s.header}>
          <Header isEdit={!!data} />
        </div>
        <div className={s.content}>
          <Content />
        </div>
        <div className={s.control}>
          <Controls />
        </div>
      </form>
    </FormProvider>
  );
};
