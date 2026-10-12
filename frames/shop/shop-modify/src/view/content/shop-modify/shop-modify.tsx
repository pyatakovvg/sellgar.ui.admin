import { useLoaderData, useSubmit } from '@sellgar/app/react';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ShopModifyControllerInterface } from '../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';
import { ShopFormMapper } from '../../../classes/controller/shop-modify/mapper/shop-form.mapper.ts';
import type { ShopFormInput } from '../../../classes/controller/shop-modify/input/shop-form.input.ts';
import { SHOP_MODIFY_FORM_ID } from '../../../constants/shop-modify.constants.ts';

import { Base } from './base';
import { Contacts } from './contacts';
import { Addresses } from './addresses';
import { Seller } from './seller';

import { schema } from './form.schema.ts';

import s from './default.module.scss';

export const ShopModify: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);
  const submit = useSubmit(ShopModifyControllerInterface);

  const methods = useForm<ShopFormInput>({
    mode: 'onChange',
    defaultValues: ShopFormMapper.fromEntity(data),
    resolver: yupResolver(schema),
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    await submit(values);
  });

  return (
    <form id={SHOP_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
      <FormProvider {...methods}>
        <Base />
        <Contacts />
        <Addresses />
        <Seller />
      </FormProvider>
    </form>
  );
};
