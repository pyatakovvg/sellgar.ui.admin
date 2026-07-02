import { ShopEntity } from '@library/domain';
import { useLoaderData, useSubmit } from '@tiyn/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ShopModifyControllerInterface } from '../../../classes/controller/shop-modify-controller.interface.ts';
import { SHOP_MODIFY_FORM_ID } from '../../../constants';

import { Fields } from './fields';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const ShopModify: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface) as ShopEntity | undefined;
  const submit = useSubmit(ShopModifyControllerInterface);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      name: data?.name ?? '',
    },
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (data) {
      await submit({
        uuid: data.uuid,
        name: values.name,
      });
      return;
    }

    await submit({
      name: values.name,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={SHOP_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields inProcess={submit.inProcess} />
      </form>
    </FormProvider>
  );
};
