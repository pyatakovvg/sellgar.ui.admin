import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData, useSubmit } from '@tiyn/app';

import React from 'react';

import { AdjustInventoryControllerInterface } from '../../../../../classes/controller/operation/adjust';
import { StoreInventoryContextControllerInterface } from '../../../../../classes/controller/context';
import { STORE_INVENTORY_FORM_ID } from '../../../../../constants';
import { InventoryOperationFields } from '../shared';
import { schema, type AdjustInventoryFormData } from './form.schema.ts';

import s from './default.module.scss';

export const AdjustInventoryForm: React.FC = () => {
  const data = useLoaderData(StoreInventoryContextControllerInterface);
  const submit = useSubmit(AdjustInventoryControllerInterface);
  const methods = useForm<AdjustInventoryFormData>({
    mode: 'onChange',
    defaultValues: {
      quantity: data.offer.inventory?.quantity ?? 0,
      reason: '',
    },
    resolver: yupResolver(schema) as Resolver<AdjustInventoryFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    await submit({
      ...values,
      expectedVersion: data.offer.inventory?.version ?? 0,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={STORE_INVENTORY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <InventoryOperationFields inProcess={submit.inProcess} quantityLabel={'Итоговый остаток'} />
      </form>
    </FormProvider>
  );
};
