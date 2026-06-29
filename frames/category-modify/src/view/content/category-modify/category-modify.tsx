import { CategoryEntity } from '@library/domain';
import { useLoaderData, useSubmit } from '@tiyn/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CategoryModifyControllerInterface } from '../../../classes/controller/category-modify-controller.interface.ts';
import { CATEGORY_MODIFY_FORM_ID } from '../../../constants';

import { Fields } from './fields';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const CategoryModify: React.FC = () => {
  const category = useLoaderData(CategoryModifyControllerInterface) as CategoryEntity | undefined;
  const submit = useSubmit(CategoryModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      parentUuid: category?.parentUuid ?? undefined,
      code: category?.code ?? '',
      name: category?.name ?? '',
      description: category?.description ?? '',
      image: category?.image ?? null,
    },
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    const parentUuid = values.parentUuid || undefined;

    if (category) {
      await submit({
        uuid: category.uuid,
        version: category.version,
        parentUuid,
        code: values.code,
        name: values.name,
        description: values.description,
        image: values.image,
      });
      return;
    }

    await submit({
      parentUuid,
      code: values.code,
      name: values.name,
      description: values.description,
      image: values.image,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={CATEGORY_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} />
      </form>
    </FormProvider>
  );
};
