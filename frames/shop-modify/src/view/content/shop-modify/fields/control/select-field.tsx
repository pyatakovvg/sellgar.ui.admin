import { Form } from '@library/design';
import { Caption, Field, Label, Select } from '@sellgar/kit';
import React from 'react';
import { Controller, type Path, useFormContext } from 'react-hook-form';

import type { ShopFormInput } from '../../../../../classes/controller/shop-modify/input/shop-form.input.ts';

interface Option {
  code: string;
  name: string;
}

interface Props {
  name: Path<ShopFormInput>;
  label: string;
  options: Option[];
  disabled?: boolean;
}

export const SelectField: React.FC<Props> = (props) => {
  const { control } = useFormContext<ShopFormInput>();

  return (
    <Controller
      name={props.name}
      control={control}
      disabled={props.disabled}
      render={({ field, fieldState: { error } }) => (
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={props.label} />
              </Field.Label>
              <Field.Content>
                <Select
                  optionKey={'code'}
                  optionValue={'name'}
                  options={props.options}
                  value={field.value as string}
                  disabled={props.disabled}
                  target={error?.message ? 'destructive' : undefined}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              </Field.Content>
              {error?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
      )}
    />
  );
};
