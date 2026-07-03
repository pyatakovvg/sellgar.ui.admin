import { Form } from '@library/design';
import { Caption, Field, Label, Textarea } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import * as FS from '../../form.schema.ts';

interface DescriptionFieldProps {
  control: RHF.Control<FS.IFormData>;
  inProcess: boolean;
}

export const DescriptionField: React.FC<DescriptionFieldProps> = (props) => {
  const {
    field,
    fieldState: { error },
  } = RHF.useController({
    name: 'description',
    control: props.control,
    disabled: props.inProcess,
  });

  return (
    <Form.Fields>
      <Form.Fields.Field>
        <Field>
          <Field.Label>
            <Label label={'Описание'} />
          </Field.Label>
          <Field.Content>
            <Textarea
              {...field}
              value={field.value ?? ''}
              target={error?.message ? 'destructive' : undefined}
              size={'md'}
              placeholder={'Описание'}
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
  );
};
