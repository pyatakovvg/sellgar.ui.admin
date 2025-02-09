import { ButtonContext, EMode, ESize, Heading, Text, Underlay } from '@library/kit';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Property } from './Property';

import { UpdateProductDto } from '../../../../../../classes/store/form/dto/update-product.dto.ts';
import { CreateProductDto } from '../../../../../../classes/store/form/dto/create-product.dto.ts';
import { ProductPropertyDto } from '../../../../../../classes/store/form/dto/product-property.dto.ts';

import s from './default.module.scss';

export const Properties: React.FC = () => {
  const { control } = useFormContext<UpdateProductDto | CreateProductDto>();

  const { fields, append, remove } = useFieldArray({
    name: 'properties',
    control,
  });

  return (
    <Underlay>
      <div className={s.wrapper}>
        <div className={s.header}>
          <Heading variant={'H4'}>Свойства</Heading>
        </div>
        <div className={s.content}>
          {!fields.length && <Text>У товара нет свойств</Text>}
          {fields.map((field, index) => {
            return (
              <div key={field?.uuid ?? index} className={s.property}>
                <Property field={field} index={index} onDelete={() => remove(index)} />
              </div>
            );
          })}
        </div>
        <div className={s.control}>
          <ButtonContext size={ESize.SM} mode={EMode.SUCCESS} onClick={() => append(new ProductPropertyDto())}>
            Добавить свойство
          </ButtonContext>
        </div>
      </div>
    </Underlay>
  );
};
