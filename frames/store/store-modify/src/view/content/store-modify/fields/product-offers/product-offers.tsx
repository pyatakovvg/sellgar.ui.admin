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
}

export const ProductOffers: React.FC<IProps> = (props) => {
  const defaultCurrencyCode = props.currencies[0]?.code ?? '';
  const { control, clearErrors } = useFormContext<IFormData>();
  const { fields, replace } = useFieldArray({
    control,
    name: 'offers',
  });
  const product = useWatch({ control, name: 'product' });

  const handleProductChange = React.useCallback(
    (nextProduct: ProductOption | null) => {
      replace(
        (nextProduct?.variants ?? []).map((variant) => ({
          variantUuid: variant.uuid,
          currentPrice: {
            value: '',
            currencyCode: defaultCurrencyCode,
          },
          showing: false,
          records: [{ article: '', clarifications: [] }],
        })),
      );
      clearErrors('offers');
    },
    [clearErrors, defaultCurrencyCode, replace],
  );

  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <ProductField onProductChange={handleProductChange} />
      </div>
      <div className={s.field}>
        <OffersTabs currencies={props.currencies} product={product ?? undefined} fields={fields} />
      </div>
    </div>
  );
};
