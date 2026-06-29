import { CurrencyEntity, StoreProductEntity } from '@library/domain';
import { useLoaderData, useNavigate, useSubmit } from '@tiyn/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CurrencyListControllerInterface } from '../../../classes/controller/currency-list-controller.interface.ts';
import { StoreModifyControllerInterface } from '../../../classes/controller/store-modify-controller.interface.ts';
import { STORE_MODIFY_FORM_ID } from '../../../constants';
import { Form } from '../../form';
import { schema, type IFormData } from '../../form.schema.ts';

import s from './default.module.scss';

export const StoreModify: React.FC = () => {
  const data = useLoaderData(StoreModifyControllerInterface) as StoreProductEntity | undefined;
  const currency = useLoaderData(CurrencyListControllerInterface) as CurrencyEntity[];
  const submit = useSubmit(StoreModifyControllerInterface);
  const navigate = useNavigate();
  const firstOffer = data?.offers?.[0];
  const defaultCurrencyCode = firstOffer?.currentPrice?.currency.code ?? currency[0]?.code ?? '';

  const methods = useForm<IFormData>({
    defaultValues: {
      article: data?.article ?? '',
      shopUuid: data?.shop.uuid ?? '',
      variantUuid: firstOffer?.variant.uuid ?? '',
      currentPrice: {
        value: firstOffer?.currentPrice?.value ?? '',
        currencyCode: defaultCurrencyCode,
      },
      showing: data?.showing ?? false,
    },
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    const result = await submit({
      ...values,
      offerUuid: firstOffer?.uuid,
      expectedVersion: data?.version,
    });

    if (!result) {
      return;
    }

    if (data) {
      await navigate.to('/store');
      return;
    }

    await navigate.to('/store/' + result.uuid);
  });

  return (
    <FormProvider {...methods}>
      <form id={STORE_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Form />
      </form>
    </FormProvider>
  );
};
