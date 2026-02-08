import { BrandEntity } from '@library/domain';
import { useWidgetController, useWidgetLoaderData } from '@library/app';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Header } from './header';
import { Content } from './content';
import { Controls } from './controls';

import { useCreateRequest } from '../../requests/create.request.ts';
import { useUpdateRequest } from '../../requests/update.request.ts';

import { schema } from './schema.ts';

import s from './modify.module.scss';
import { BrandModifyControllerInterface } from '../../classes/controller/brand-modify-controller.interface.ts';

interface IForm {
  code: string;
  name: string;
  description: string;
}

export const Modify = () => {
  const [data] = useWidgetLoaderData<[BrandEntity]>();

  const controller = useWidgetController(BrandModifyControllerInterface);
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

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await controller.close();
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
