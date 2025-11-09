import { VariantEntity } from '@library/domain';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { Header } from './header';
import { Variant } from './variant';

import s from './variants.module.scss';

export const Variants = () => {
  const { control } = ReactHookForm.useFormContext();
  const { fields, prepend, remove } = ReactHookForm.useFieldArray({ control, name: 'variants' });

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header onAdd={() => prepend(new VariantEntity())} />
      </div>
      <div className={s.content}>
        {fields.map((field, index) => (
          <div key={field.id} className={s.line}>
            <Variant index={index} onCopy={() => {}} onDelete={() => remove(index)} />
          </div>
        ))}
      </div>
    </div>
  );
};
