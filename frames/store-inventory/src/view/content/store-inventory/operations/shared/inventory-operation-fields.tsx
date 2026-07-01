import { Form } from '@library/design';
import { Caption, Field, Input, Label, Textarea } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InventoryOperationFieldsProps {
  inProcess: boolean;
  quantityLabel: string;
}

interface InventoryOperationFormData {
  quantity: number;
  reason: string;
}

export const InventoryOperationFields: React.FC<InventoryOperationFieldsProps> = (props) => {
  const { control } = useFormContext<InventoryOperationFormData>();

  return (
    <>
      <Controller
        name={'quantity'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={props.quantityLabel} />
                </Field.Label>
                <Field.Content>
                  <Input
                    name={field.name}
                    ref={field.ref}
                    value={String(field.value ?? '')}
                    size={'md'}
                    placeholder={'Количество'}
                    target={error?.message ? 'destructive' : undefined}
                    onBlur={field.onBlur}
                    onChange={(event) =>
                      field.onChange(event.currentTarget.value === '' ? undefined : Number(event.currentTarget.value))
                    }
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

      <Controller
        name={'reason'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Причина'} />
                </Field.Label>
                <Field.Content>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    size={'md'}
                    placeholder={'Причина'}
                    target={error?.message ? 'destructive' : undefined}
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
    </>
  );
};
