import { useBlocker, useLoaderData, useSubmit } from '@sellgar/app/react';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CurrencyListControllerInterface } from '../../../classes/controller/currency-list/currency-list-controller.interface.ts';
import { StoreModifyControllerInterface } from '../../../classes/controller/store-modify/store-modify-controller.interface.ts';
import { STORE_MODIFY_FORM_ID } from '../../../constants/store-modify.constants.ts';
import { Fields } from './fields';
import { type ProductOption } from './fields/product-offers/product-option.ts';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const StoreModify: React.FC = () => {
  const data = useLoaderData(StoreModifyControllerInterface);
  const currencies = useLoaderData(CurrencyListControllerInterface);
  const submit = useSubmit(StoreModifyControllerInterface);
  const defaultCurrencyCode = currencies[0]?.code ?? '';
  const initialProduct = React.useMemo<ProductOption | undefined>(() => {
    if (!data) {
      return undefined;
    }

    return {
      uuid: data.productUuid,
      name: data.productSnapshot?.name ?? 'Не синхронизирован',
      variants: data.offers.map((offer) => ({
        uuid: offer.variantUuid,
        name: offer.variantSnapshot?.name ?? 'Не синхронизирован',
      })),
    };
  }, [data]);

  const defaultOffers = React.useMemo<IFormData['offers']>(() => {
    if (!data) {
      return [];
    }

    const variants = initialProduct?.variants ?? [];
    const offerByVariantUuid = new Map(data.offers.map((offer) => [offer.variantUuid, offer]));

    return variants.map((variant) => {
      const offer = offerByVariantUuid.get(variant.uuid);

      return {
        uuid: offer?.uuid,
        variantUuid: variant.uuid,
        currentPrice: {
          value: offer?.currentPrice?.value ?? '',
          currencyCode: offer?.currentPrice?.currency.code ?? defaultCurrencyCode,
        },
        showing: offer?.showing ?? false,
        records: offer?.records.map((record) => ({
          uuid: record.uuid,
          article: record.article,
          clarifications: record.clarifications.map((clarification) => ({ value: clarification.value })),
        })) ?? [{ article: '', clarifications: [] }],
      };
    });
  }, [data, defaultCurrencyCode, initialProduct]);

  const methods = useForm<IFormData>({
    disabled: submit.inProcess,
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      shopUuid: data?.shopUuid ?? '',
      product: initialProduct ?? null,
      showing: data?.showing ?? false,
      offers: defaultOffers,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    await submit({
      ...values,
      expectedVersion: data?.version,
    });
  });

  useBlocker(methods.formState.isDirty);

  return (
    <FormProvider {...methods}>
      <form id={STORE_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields currencies={currencies} />
      </form>
    </FormProvider>
  );
};
