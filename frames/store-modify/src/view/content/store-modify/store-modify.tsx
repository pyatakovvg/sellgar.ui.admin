import { CurrencyEntity, ProductEntity, StoreProductEntity } from '@library/domain';
import { useLoaderData, useSubmit } from '@sellgar/app';

import React from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CurrencyListControllerInterface } from '../../../classes/controller/currency-list-controller.interface.ts';
import { ProductListControllerInterface } from '../../../classes/controller/product-list-controller.interface.ts';
import { StoreModifyControllerInterface } from '../../../classes/controller/store-modify-controller.interface.ts';
import { STORE_MODIFY_FORM_ID } from '../../../constants';
import { Fields } from './fields';
import { type ProductOption } from './fields/product-offers/product-option.ts';
import { schema, type IFormData } from './form.schema.ts';

import s from './default.module.scss';

export const StoreModify: React.FC = () => {
  const data = useLoaderData(StoreModifyControllerInterface) as StoreProductEntity | undefined;
  const currency = useLoaderData(CurrencyListControllerInterface) as CurrencyEntity[];
  const loadedProducts = useLoaderData(ProductListControllerInterface) as ProductEntity[];
  const submit = useSubmit(StoreModifyControllerInterface);
  const defaultCurrencyCode = currency[0]?.code ?? '';
  const initialProduct = React.useMemo<ProductOption | undefined>(() => {
    if (!data) {
      return undefined;
    }

    return {
      uuid: data.product.uuid,
      name: data.product.name,
      variants: data.offers.map((offer) => ({
        uuid: offer.variant.uuid,
        name: offer.variant.name,
      })),
    };
  }, [data]);

  const products = React.useMemo<ProductOption[]>(() => {
    if (!initialProduct || loadedProducts.some((product) => product.uuid === initialProduct.uuid)) {
      return loadedProducts;
    }

    return [initialProduct, ...loadedProducts];
  }, [initialProduct, loadedProducts]);
  const defaultOffers = React.useMemo<IFormData['offers']>(() => {
    if (!data) {
      return [];
    }

    const product = products.find((item) => item.uuid === data.product.uuid) ?? initialProduct;
    const variants = product?.variants ?? [];
    const offerByVariantUuid = new Map(data.offers.map((offer) => [offer.variant.uuid, offer]));

    return variants.map((variant) => {
      const offer = offerByVariantUuid.get(variant.uuid);

      return {
        uuid: offer?.uuid,
        variantUuid: variant.uuid,
        article: offer?.article ?? data.article,
        currentPrice: {
          value: offer?.currentPrice?.value ?? '',
          currencyCode: offer?.currentPrice?.currency.code ?? defaultCurrencyCode,
        },
        showing: offer?.showing ?? false,
      };
    });
  }, [data, defaultCurrencyCode, initialProduct, products]);

  const methods = useForm<IFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      shopUuid: data?.shop.uuid ?? '',
      productUuid: data?.product.uuid ?? '',
      showing: data?.showing ?? false,
      offers: defaultOffers,
    },
    resolver: yupResolver(schema) as Resolver<IFormData>,
  });

  const handleSubmit = methods.handleSubmit(async (values) => {
    await submit({
      ...values,
      expectedVersion: data?.version,
    });
  });

  return (
    <FormProvider {...methods}>
      <form id={STORE_MODIFY_FORM_ID} className={s.wrapper} onSubmit={handleSubmit}>
        <Fields currencies={currency} products={products} />
      </form>
    </FormProvider>
  );
};
