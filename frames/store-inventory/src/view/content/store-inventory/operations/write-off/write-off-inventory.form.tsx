import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData, useSubmit } from '@sellgar/app-v2/react';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../../classes/controller/context/store-inventory-context-controller.interface.ts';
import { WriteOffInventoryControllerInterface } from '../../../../../classes/controller/operation/write-off/write-off-inventory-controller.interface.ts';
import { STORE_INVENTORY_FORM_ID } from '../../../../../constants/store-inventory.constants.ts';
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
    resolver: yupResolver(schema),
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
