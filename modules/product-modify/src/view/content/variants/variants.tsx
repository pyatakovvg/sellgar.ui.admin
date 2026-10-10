import React from 'react';
import * as RHF from 'react-hook-form';
import * as App from '@sellgar/app/react';

import { ProductFormMapper } from '../../../classes/controller/product/mapper/product-form.mapper.ts';
import { ProductControllerInterface } from '../../../classes/controller/product/product-controller.interface.ts';
import type { IFormData } from '../../schema.ts';

import { VariantsContext } from './context/variants.context.ts';
import { Header } from './header';
import { Variant } from './variant';

import s from './default.module.scss';

export const Variants: React.FC = () => {
  const { control, getValues } = RHF.useFormContext<IFormData>();
  const loaderData = App.useLoaderData(ProductControllerInterface);
  const typeUuid = RHF.useWatch({ control, name: 'typeUuid' });
  const productType = loaderData.productTypes.items.find((item) => item.uuid === typeUuid);
  const { fields, append, insert, remove } = RHF.useFieldArray({ control, name: 'variants' });

  const contextValue = React.useMemo(
    () => ({
      add: () => append(ProductFormMapper.createEmptyVariant(productType?.variantFields)),
    }),
    [append, productType],
  );

  const handleCopy = (index: number) => {
    insert(index + 1, ProductFormMapper.copyVariant(getValues(`variants.${index}`)));
  };

  return (
    <VariantsContext.Provider value={contextValue}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <Header />
        </div>
        <div className={s.content}>
          {fields.map((field, index) => (
            <div key={field.id} className={s.line}>
              <Variant
                index={index}
                canDelete={fields.length > 1}
                onCopy={() => handleCopy(index)}
                onDelete={() => remove(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </VariantsContext.Provider>
  );
};
