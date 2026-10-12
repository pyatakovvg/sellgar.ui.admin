import * as AppRuntime from '@sellgar/app/react';

import React from 'react';
import * as RHF from 'react-hook-form';
import * as YR from '@hookform/resolvers/yup';

import { BrandModifyControllerInterface } from '../../../classes/controller/brand-modify/brand-modify-controller.interface.ts';

import { BRAND_MODIFY_FORM_ID } from '../../../constants/brand-modify.constants.ts';

import * as FS from './form.schema.ts';

import { Fields } from './fields';

import s from './default.module.scss';

export const BrandModify: React.FC = () => {
  const data = AppRuntime.useLoaderData(BrandModifyControllerInterface);
  const submit = AppRuntime.useSubmit(BrandModifyControllerInterface);

  const methods = RHF.useForm<FS.IFormData>({
    mode: 'onChange',
    defaultValues: {
      code: data?.code ?? '',
      name: data?.name ?? '',
      description: data?.description ?? '',
      images: data?.images ?? [],
    },
    resolver: YR.yupResolver(FS.schema),
  });

  AppRuntime.useBlocker(methods.formState.isDirty);

  const handleSubmit = methods.handleSubmit(async (values) => {
    await submit({
      ...values,
      version: data?.version,
    });
  });

  return (
    <RHF.FormProvider {...methods}>
      <form id={BRAND_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} immutable={Boolean(data)} />
      </form>
    </RHF.FormProvider>
  );
};
