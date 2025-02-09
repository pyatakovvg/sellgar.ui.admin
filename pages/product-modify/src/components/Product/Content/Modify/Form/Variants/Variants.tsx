import { ButtonContext, EMode, ESize, Heading, Text } from '@library/kit';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Variant } from './Variant';

import { CreateProductDto } from '../../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../../classes/store/form/dto/update-product.dto.ts';
import { ProductVariantDto } from '../../../../../../classes/store/form/dto/product-variant.dto.ts';

import s from './default.module.scss';

export const Variants: React.FC = () => {
  const { control } = useFormContext<CreateProductDto | UpdateProductDto>();
  const { fields, append, remove } = useFieldArray({
    name: 'variants',
    control,
  });

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H4'}>Варианты</Heading>
      </div>
      <div className={s.content}>
        {!fields.length && <Text>У товара нет вариантов</Text>}
        {fields.map((field, index) => {
          return (
            <div key={field?.uuid ?? index} className={s.variant}>
              <Variant field={field} index={index} onDelete={() => remove(index)} />
            </div>
          );
        })}
      </div>
      <div className={s.control}>
        <ButtonContext size={ESize.SM} mode={EMode.SUCCESS} onClick={() => append(new ProductVariantDto())}>
          Добавить вариант
        </ButtonContext>
      </div>
    </div>
  );
};
