import { Icon, Input, Textarea, Card, FieldWrapper, Label, Caption } from '@sellgar/kit';

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
                <FieldWrapper>
                  <FieldWrapper.Label>
                    <Label label={'Артикул'} />
                  </FieldWrapper.Label>
                  <FieldWrapper.Content>
                    <Input
                      {...register(`variants.${props.index}.article`)}
                      placeholder={'Артикул'}
                      target={!!errors?.variants?.[props.index]?.article?.message ? 'destructive' : undefined}
                    />
                  </FieldWrapper.Content>
                  {!!errors?.variants?.[props.index]?.article?.message && (
                    <FieldWrapper.Caption>
                      <Caption
                        state={'destructive'}
                        caption={errors?.variants?.[props.index]?.article?.message ?? ''}
                      />
                    </FieldWrapper.Caption>
                  )}
                </FieldWrapper>
              </div>
              <div className={s.field}>
                <FieldWrapper>
                  <FieldWrapper.Label>
                    <Label label={'Название'} />
                  </FieldWrapper.Label>
                  <FieldWrapper.Content>
                    <Input
                      {...register(`variants.${props.index}.name`)}
                      placeholder={'Наименование'}
                      target={!!errors?.variants?.[props.index]?.name?.message ? 'destructive' : undefined}
                    />
                  </FieldWrapper.Content>
                  {!!errors?.variants?.[props.index]?.name?.message && (
                    <FieldWrapper.Caption>
                      <Caption state={'destructive'} caption={errors?.variants?.[props.index]?.name?.message ?? ''} />
                    </FieldWrapper.Caption>
                  )}
                </FieldWrapper>
              </div>
            </div>
          </div>
          <div className={s.field}>
            <FieldWrapper>
              <FieldWrapper.Label>
                <Label label={'Описание'} />
              </FieldWrapper.Label>
              <FieldWrapper.Content>
                <Textarea
                  {...register(`variants.${props.index}.description`)}
                  placeholder={'Описание'}
                  target={!!errors?.variants?.[props.index]?.description?.message ? 'destructive' : undefined}
                />
              </FieldWrapper.Content>
              {!!errors?.variants?.[props.index]?.description?.message && (
                <FieldWrapper.Caption>
                  <Caption
                    state={'destructive'}
                    caption={errors?.variants?.[props.index]?.description?.message ?? ''}
                  />
                </FieldWrapper.Caption>
              )}
            </FieldWrapper>
          </div>
        </div>
      </div>
    </Card>
  );
};
