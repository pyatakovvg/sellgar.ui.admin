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

import s from './default.module.css';

export const StoreModify: React.FC = () => {
  const context = useLoaderData(StoreModifyControllerInterface);
  const data = context?.storeProduct;
  const currencies = useLoaderData(CurrencyListControllerInterface);
  const submit = useSubmit(StoreModifyControllerInterface);
  const defaultCurrencyCode = currencies[0]?.code ?? '';
  const initialProduct = React.useMemo<ProductOption | undefined>(() => {
    if (!data || !context) {
      return undefined;
    }

    const variants = new Map(
      data.offers.map((offer) => [
        offer.variantUuid,
        { uuid: offer.variantUuid, name: offer.variantSnapshot?.name ?? 'Не синхронизирован' },
      ]),
    );

    for (const variant of context.product.variants) {
      if (variant.status === 'active' || variants.has(variant.uuid)) {
        variants.set(variant.uuid, { uuid: variant.uuid, name: variant.name });
      }
    }

    return {
      uuid: data.productUuid,
      name: context.product.name,
      variants: [...variants.values()],
    };
  }, [context, data]);

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
      categoryUuids: data?.categoryUuids ?? [],
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
