import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData, useSubmit } from '@tiyn/app';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../../classes/controller/context';
import { WriteOffInventoryControllerInterface } from '../../../../../classes/controller/operation/write-off';
import { STORE_INVENTORY_FORM_ID } from '../../../../../constants';
import { InventoryOperationFields } from '../shared';
import { schema, type WriteOffInventoryFormData } from './form.schema.ts';

import s from './default.module.scss';

export const WriteOffInventoryForm: React.FC = () => {
  const data = useLoaderData(StoreInventoryContextControllerInterface);
  const submit = useSubmit(WriteOffInventoryControllerInterface);
  const methods = useForm<WriteOffInventoryFormData>({
    mode: 'onChange',
    defaultValues: {
      quantity: 1,
      reason: '',
    },
    resolver: yupResolver(schema) as Resolver<WriteOffInventoryFormData>,
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
        <InventoryOperationFields inProcess={submit.inProcess} quantityLabel={'Количество списания'} />
      </form>
    </FormProvider>
  );
};
