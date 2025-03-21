import { Field } from '@library/kit';
import { Icon, Input, Textarea, Card } from '@sellgar/kit';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { CreateProductDto } from '../../../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../../../classes/store/form/dto/update-product.dto.ts';
import { ProductVariantDto } from '../../../../../../../classes/store/form/dto/product-variant.dto.ts';

import s from './default.module.scss';

interface IProps {
  index: number;
  field: Partial<ProductVariantDto>;
  onDelete(): void;
}

export const Variant: React.FC<IProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateProductDto | UpdateProductDto>();

  return (
    <Card target={'inverted'}>
      <div className={s.wrapper}>
        <div className={s.delete}>
          <span onClick={props.onDelete}>
            <Icon icon={'close-line'} />
          </span>
        </div>
        <div className={s.content}>
          <div className={s.field}>
            <div className={s.fields}>
              <div className={s.field}>
                <Field label={'Артикул'} error={errors?.variants?.[props.index]?.article?.message ?? ''}>
                  <Input {...register(`variants.${props.index}.article`)} placeholder={'Артикул'} />
                </Field>
              </div>
              <div className={s.field}>
                <Field label={'Название'} error={errors?.variants?.[props.index]?.name?.message ?? ''}>
                  <Input {...register(`variants.${props.index}.name`)} placeholder={'Наименование'} />
                </Field>
              </div>
            </div>
          </div>
          <div className={s.field}>
            <Field label={'Описание'} error={errors?.variants?.[props.index]?.description?.message ?? ''}>
              <Textarea {...register(`variants.${props.index}.description`)} placeholder={'Описание'} />
            </Field>
          </div>
        </div>
      </div>
    </Card>
  );
};
