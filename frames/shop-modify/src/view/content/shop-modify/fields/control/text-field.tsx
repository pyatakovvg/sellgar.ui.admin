import { Form } from '@library/design';
import { Caption, Field, Input, Label, Textarea } from '@sellgar/kit';
import React from 'react';
import { Controller, type Path, useFormContext } from 'react-hook-form';

import type { ShopFormInput } from '../../../../../classes/controller/shop-modify/input/shop-form.input.ts';

interface Props {
  name: Path<ShopFormInput>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
}

export const TextField: React.FC<Props> = (props) => {
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
                {props.multiline ? (
                  <Textarea
                    {...field}
                    value={typeof field.value === 'string' ? field.value : ''}
                    target={error?.message ? 'destructive' : undefined}
                    placeholder={props.placeholder}
                  />
                ) : (
                  <Input
                    {...field}
                    value={typeof field.value === 'string' ? field.value : ''}
                    target={error?.message ? 'destructive' : undefined}
                    size={'md'}
                    placeholder={props.placeholder}
                  />
                )}
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
