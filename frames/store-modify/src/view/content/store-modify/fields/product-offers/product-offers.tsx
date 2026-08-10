import type { CurrencyEntity } from '@library/domain';

import React from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { type IFormData } from '../../form.schema.ts';
import { OffersTabs } from './offers-tabs';
import { ProductField } from './product-field';
import { type ProductOption } from './product-option.ts';

import s from './default.module.scss';

interface IProps {
  currencies: CurrencyEntity[];
  products: ProductOption[];
}

export const ProductOffers: React.FC<IProps> = (props) => {
  const defaultCurrencyCode = props.currencies[0]?.code ?? '';
  const { control, clearErrors } = useFormContext<IFormData>();
  const { fields, replace } = useFieldArray({
    control,
    name: 'offers',
  });
  const productUuid = useWatch({ control, name: 'productUuid' });
  const product = React.useMemo(
    () => props.products.find((item) => item.uuid === productUuid),
    [productUuid, props.products],
  );

  const handleProductChange = React.useCallback(
    (nextProductUuid: string) => {
      const nextProduct = props.products.find((item) => item.uuid === nextProductUuid);

      replace(
        (nextProduct?.variants ?? []).map((variant) => ({
          variantUuid: variant.uuid,
          article: '',
          currentPrice: {
            value: '',
            currencyCode: defaultCurrencyCode,
          },
          showing: false,
        })),
      );
      clearErrors('offers');
    },
    [clearErrors, defaultCurrencyCode, props.products, replace],
  );

  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <ProductField products={props.products} onProductChange={handleProductChange} />
      </div>
      <div className={s.field}>
        <OffersTabs currencies={props.currencies} product={product} fields={fields} />
      </div>
    </div>
  );
};
