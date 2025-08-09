import { Typography, Button, Icon } from '@sellgar/kit';

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
      <div className={s.content}>
        {!fields.length && (
          <Typography size={'body-m'} weight={'medium'}>
            <p>У товара нет вариантов</p>
          </Typography>
        )}
        {fields.map((field, index) => {
          return (
            <div key={field?.uuid ?? index} className={s.variant}>
              <Variant field={field} index={index} onDelete={() => remove(index)} />
            </div>
          );
        })}
      </div>
      <div className={s.control}>
        <Button
          size={'xs'}
          style={'secondary'}
          leadIcon={<Icon icon={'add-fill'} />}
          onClick={() => append(new ProductVariantDto())}
        >
          Добавить вариант
        </Button>
      </div>
    </div>
  );
};
