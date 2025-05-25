import { FieldWrapper, Caption, Icon, InputNumeral } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { CreateProductStoreDto } from '../../../../../../classes/store/form/dto/create-product-store.dto.ts';
import { UpdateProductStoreDto } from '../../../../../../classes/store/form/dto/update-product-store.dto.ts';

import s from './default.module.scss';

interface IProps {
  value: number;
  onReset?(): void;
}

export const EditPrice: React.FC<IProps> = (props) => {
  const { control } = useFormContext<CreateProductStoreDto | UpdateProductStoreDto>();

  React.useEffect(() => {
    return () => {
      control.unregister('price');
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Controller
          name={'price'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FieldWrapper>
              <FieldWrapper.Content>
                <InputNumeral
                  {...field}
                  defaultValue={props.value}
                  tailIcon={
                    props.onReset && (
                      <div className={s.reset} onClick={props.onReset}>
                        <Icon icon={'close-fill'} />
                      </div>
                    )
                  }
                  onChange={(event) => field.onChange(InputNumeral.unFormat(event.target.value))}
                />
              </FieldWrapper.Content>
              {error?.message && (
                <FieldWrapper.Caption>
                  <Caption state={'destructive'} caption={error?.message} />
                </FieldWrapper.Caption>
              )}
            </FieldWrapper>
          )}
        ></Controller>
      </div>
    </div>
  );
};
