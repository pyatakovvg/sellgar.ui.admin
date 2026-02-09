import { BrandEntity } from '@library/domain';
import { useWidgetLoaderData } from '@library/app';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Header } from './header';
import { Content } from './content';

import { useCreateRequest } from '../../requests/create.request.ts';
import { useUpdateRequest } from '../../requests/update.request.ts';

import { schema } from './schema.ts';

import s from './modify.module.scss';

interface IForm {
  code: string;
  name: string;
  description: string;
}

export const Modify = () => {
  const [data] = useWidgetLoaderData<[BrandEntity]>();

  const createRequest = useCreateRequest();
  const updateRequest = useUpdateRequest();

  const methods = useForm<IForm>({ mode: 'onChange', defaultValues: data, resolver: yupResolver(schema) });

  const handleSubmit = async (values: IForm) => {
    if (data) {
      await updateRequest(data.uuid, {
        uuid: data.uuid,
        code: values.code,
        name: values.name,
        description: values.description,
      });
    } else {
      await createRequest({
        code: values.code,
        name: values.name,
        description: values.description,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={s.wrapper} onSubmit={methods.handleSubmit(handleSubmit)}>
        <Header />
        <Content />
      </form>
    </FormProvider>
  );
};
