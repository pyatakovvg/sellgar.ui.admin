import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { Header } from './header';
import { Variant } from './variant';

import { VariantsContext } from './context/variants.context.ts';
import { copyVariantFormData, createEmptyVariant } from '../../form-values.ts';
import type { IFormData } from '../../schema.ts';
import s from './default.module.scss';

export const Variants: React.FC = () => {
  const { control, getValues } = ReactHookForm.useFormContext<IFormData>();
  const { fields, append, insert, remove } = ReactHookForm.useFieldArray({ control, name: 'variants' });

  const contextValue = React.useMemo(
    () => ({
      add: () => append(createEmptyVariant()),
    }),
    [append],
  );

  const handleCopy = (index: number) => {
    insert(index + 1, copyVariantFormData(getValues(`variants.${index}`)));
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
