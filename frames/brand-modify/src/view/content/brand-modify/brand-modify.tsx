import { BrandEntity } from '@library/domain';
import { useLoaderData, useSubmit } from '@tiyn/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BrandModifyControllerInterface } from '../../../classes/controller/brand-modify-controller.interface.ts';
import { BRAND_MODIFY_FORM_ID } from '../../../constants';

import { Fields } from './fields';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const BrandModify: React.FC = () => {
  const data = useLoaderData(BrandModifyControllerInterface) as BrandEntity | undefined;
  const submit = useSubmit(BrandModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      code: data?.code ?? '',
      name: data?.name ?? '',
      description: data?.description ?? '',
      image: data?.image ?? null,
    },
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (data) {
      await submit({
        uuid: data.uuid,
        version: data.version,
        code: values.code,
        name: values.name,
        description: values.description,
        image: values.image,
      });
      return;
    }

    await submit({
      code: values.code,
      name: values.name,
      description: values.description,
      image: values.image,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={BRAND_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} />
      </form>
    </FormProvider>
  );
};
