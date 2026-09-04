import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoaderData, useSubmit } from '@sellgar/app/react';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../../classes/controller/context/store-inventory-context-controller.interface.ts';
import { AdjustInventoryControllerInterface } from '../../../../../classes/controller/operation/adjust/adjust-inventory-controller.interface.ts';
import { STORE_INVENTORY_FORM_ID } from '../../../../../constants/store-inventory.constants.ts';
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
        <InventoryOperationFields inProcess={submit.inProcess} quantityLabel={'Итоговый остаток'} />
      </form>
    </FormProvider>
  );
};
