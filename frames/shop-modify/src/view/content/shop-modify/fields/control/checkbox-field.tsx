import { Checkbox, Field } from '@sellgar/kit';
import React from 'react';
import { Controller, type Path, useFormContext } from 'react-hook-form';

import type { ShopFormInput } from '../../../../../classes/controller/shop-modify/input/shop-form.input.ts';

interface Props {
  name: Path<ShopFormInput>;
  label: string;
  disabled?: boolean;
}

export const CheckboxField: React.FC<Props> = (props) => {
  const { control } = useFormContext<ShopFormInput>();

  return (
    <Controller
      name={props.name}
      control={control}
      disabled={props.disabled}
      render={({ field }) => (
        <Field>
          <Field.Content>
            <Checkbox
              checked={Boolean(field.value)}
              disabled={field.disabled}
              label={props.label}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />
          </Field.Content>
        </Field>
      )}
    />
  );
};
