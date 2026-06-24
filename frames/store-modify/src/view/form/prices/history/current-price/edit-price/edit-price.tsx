import { Field, Caption, Icon, InputNumeral } from '@sellgar/kit';

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
            <Field>
              <Field.Content>
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
              </Field.Content>
              {error?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error?.message} />
                </Field.Caption>
              )}
            </Field>
          )}
        ></Controller>
      </div>
    </div>
  );
};
