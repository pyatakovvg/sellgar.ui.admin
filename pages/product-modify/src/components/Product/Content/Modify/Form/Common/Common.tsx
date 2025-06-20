import { Field, TreeSelect } from '@library/kit';
import { SelectTree, Input, Select } from '@sellgar/kit';

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
            <Field label={'Название'} error={errors.name?.message}>
              <Input {...register('name')} autoFocus={true} tabIndex={1} placeholder={'Наименование'} />
            </Field>
          </div>
          <div className={s['field-v']}>
            <div className={s.horizontal}>
              <div className={s['field-h']}>
                <Controller
                  name={'categoryUuid'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Field label={'Категория'} error={errors.categoryUuid?.message}>
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
                      </Field>
                    );
                  }}
                />
              </div>
              <div className={s['field-h']}>
                <Controller
                  //@ts-ignore
                  name={'brandUuid'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Field label={'Бренд'} error={errors.brandUuid?.message}>
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
                      </Field>
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
