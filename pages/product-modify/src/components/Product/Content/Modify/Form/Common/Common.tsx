import { FieldWrapper, Label, Caption, SelectTree, Input, Select } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormState, useFormContext } from 'react-hook-form';

import { CreateProductDto } from '../../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../../classes/store/form/dto/update-product.dto.ts';

import { useGetBrandsData } from '../../../../../../hooks/get-brands-data.hook.ts';
import { useGetCategoriesData } from '../../../../../../hooks/get-categories-data.hook.ts';

import s from './default.module.scss';

export const Common: React.FC = () => {
  const { control, register } = useFormContext<CreateProductDto | UpdateProductDto>();
  const { errors } = useFormState({ control });

  const brands = useGetBrandsData();
  const categories = useGetCategoriesData();

  return (
    <div className={s.wrappper}>
      <div className={s.content}>
        <div className={s.fields}>
          <div className={s['field-v']}>
            <FieldWrapper>
              <FieldWrapper.Label>
                <Label label={'Название'} />
              </FieldWrapper.Label>
              <FieldWrapper.Content>
                <Input
                  {...register('name')}
                  autoFocus={true}
                  tabIndex={1}
                  placeholder={'Наименование'}
                  target={errors.name?.message ? 'destructive' : undefined}
                />
              </FieldWrapper.Content>
              {errors.name?.message && (
                <FieldWrapper.Caption>
                  <Caption state={'destructive'} caption={errors.name?.message} />
                </FieldWrapper.Caption>
              )}
            </FieldWrapper>
          </div>
          <div className={s['field-v']}>
            <div className={s.horizontal}>
              <div className={s['field-h']}>
                <Controller
                  name={'categoryUuid'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FieldWrapper>
                        <FieldWrapper.Label>
                          <Label label={'Категория'} />
                        </FieldWrapper.Label>
                        <FieldWrapper.Content>
                          <SelectTree
                            isClearable={true}
                            placeholder={'Категория'}
                            optionKey={'uuid'}
                            optionValue={'name'}
                            accessor={'children'}
                            value={field.value ?? null}
                            options={categories}
                            onChange={(value) => {
                              return field.onChange(value);
                            }}
                            onBlur={field.onBlur}
                          />
                        </FieldWrapper.Content>
                        {errors.categoryUuid?.message && (
                          <FieldWrapper.Caption>
                            <Caption state={'destructive'} caption={errors.categoryUuid?.message} />
                          </FieldWrapper.Caption>
                        )}
                      </FieldWrapper>
                    );
                  }}
                />
              </div>
              <div className={s['field-h']}>
                <Controller
                  name={'brandUuid'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FieldWrapper>
                        <FieldWrapper.Label>
                          <Label label={'Бренд'} />
                        </FieldWrapper.Label>
                        <FieldWrapper.Content>
                          <Select
                            tabIndex={2}
                            isClearable={true}
                            placeholder={'Бренд'}
                            optionKey={'uuid'}
                            optionValue={'name'}
                            value={field.value ?? null}
                            options={brands}
                            onChange={(value) => {
                              return field.onChange(value);
                            }}
                            onBlur={field.onBlur}
                          />
                        </FieldWrapper.Content>
                        {errors.brandUuid?.message && (
                          <FieldWrapper.Caption>
                            <Caption state={'destructive'} caption={errors.brandUuid?.message} />
                          </FieldWrapper.Caption>
                        )}
                      </FieldWrapper>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
