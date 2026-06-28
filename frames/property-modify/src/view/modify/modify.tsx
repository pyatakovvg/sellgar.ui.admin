import { PropertyEntity } from '@library/domain';
import { useFrame, useLoaderData, useRevalidate } from '@tiyn/app';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { Header } from './header';
import { Content } from './content';
import { Controls } from './controls';

import { useCreateRequest } from '../../requests/create.request.ts';
import { useUpdateRequest } from '../../requests/update.request.ts';

import { schema, IFormData } from './schema.ts';
import { PropertyModifyControllerInterface } from '../../classes/controller/property-modify-controller.interface.ts';

import s from './modify.module.scss';

export const Modify = () => {
  const data = useLoaderData(PropertyModifyControllerInterface) as PropertyEntity;

  const frame = useFrame();
  const revalidate = useRevalidate();

  const createRequest = useCreateRequest();
  const updateRequest = useUpdateRequest();

  const methods = useForm<IFormData>({ mode: 'onChange', defaultValues: data, resolver: yupResolver(schema) });

  const handleSubmit = async (values: IFormData) => {
    if (data.uuid) {
      await updateRequest(data.uuid, {
        uuid: data.uuid,
        version: data.version,
        groupUuid: values.groupUuid,
        unitUuid: values.unitUuid,
        code: values.code,
        name: values.name,
        type: values.type,
        description: values.description,
      });
    } else {
      await createRequest({
        groupUuid: values.groupUuid,
        unitUuid: values.unitUuid,
        code: values.code,
        name: values.name,
        type: values.type,
        description: values.description,
      });
    }

    await revalidate();
    await frame.close();
  };

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await frame.close();
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
