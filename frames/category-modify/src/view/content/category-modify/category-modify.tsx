import { useLoaderData, useSubmit } from '@sellgar/app/react';
import { yupResolver } from '@hookform/resolvers/yup';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { CategoryModifyControllerInterface } from '../../../classes/controller/category-modify/category-modify-controller.interface.ts';
import { CATEGORY_MODIFY_FORM_ID } from '../../../constants/category-modify.constants.ts';
import { Fields } from './fields';
import { Error } from './error';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const CategoryModify: React.FC = () => {
  const { category } = useLoaderData(CategoryModifyControllerInterface);
  const submit = useSubmit(CategoryModifyControllerInterface);
  const methods = ReactHookForm.useForm<IFormData>({
    mode: 'onChange',
    disabled: submit.inProcess,
    defaultValues: {
      parentUuid: category?.parentUuid ?? null,
      name: category?.name ?? '',
      description: category?.description ?? '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = methods.handleSubmit(async (values) => {
    await submit({ ...values, description: values.description.trim() || null, expectedVersion: category?.version });
  });

  return (
    <ReactHookForm.FormProvider {...methods}>
      <form id={CATEGORY_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Error />
        <Fields />
      </form>
    </ReactHookForm.FormProvider>
  );
};
