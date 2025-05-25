import { FieldWrapper, Label, Caption, Select } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormState, useFormContext } from 'react-hook-form';

import { CreateProductStoreDto } from '../../../classes/store/form/dto/create-product-store.dto.ts';

import { usePresenter } from '../../../hooks/presenter.hook.ts';

import { ValueTemplate } from './value-template';
import { OptionTemplate } from './option-template';

import s from './default.module.scss';

export const Variant: React.FC = () => {
  const presenter = usePresenter();
  const { control, register } = useFormContext<CreateProductStoreDto>();
  const { errors } = useFormState({ control });

  return (
    <div className={s.wrappper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Controller
            name={'variantUuid'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <FieldWrapper>
                  <FieldWrapper.Label>
                    <Label label={'Товар'} />
                  </FieldWrapper.Label>
                  <FieldWrapper.Content>
                    <Select
                      {...field}
                      fixHeight={false}
                      options={presenter.variantsStore.variants}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      templateValue={(option) => {
                        if (!option) {
                          return null;
                        }
                        return <ValueTemplate {...option} />;
                      }}
                      templateOption={(option) => {
                        return <OptionTemplate {...option} />;
                      }}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </FieldWrapper.Content>
                  {!!error?.message && (
                    <FieldWrapper.Caption>
                      <Caption state={'destructive'} caption={error.message} />
                    </FieldWrapper.Caption>
                  )}
                </FieldWrapper>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
