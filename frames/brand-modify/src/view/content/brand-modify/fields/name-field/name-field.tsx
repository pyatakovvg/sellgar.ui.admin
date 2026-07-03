import { Form } from '@library/design';
import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import * as FS from '../../form.schema.ts';

interface NameFieldProps {
  control: RHF.Control<FS.IFormData>;
  inProcess: boolean;
}

export const NameField: React.FC<NameFieldProps> = (props) => {
  const {
    field,
    fieldState: { error },
  } = RHF.useController({
    name: 'name',
    control: props.control,
    disabled: props.inProcess,
  });

  return (
    <Form.Fields>
      <Form.Fields.Field>
        <Field>
          <Field.Label>
            <Label label={'Наименование'} />
          </Field.Label>
          <Field.Content>
            <Input
              {...field}
              target={error?.message ? 'destructive' : undefined}
              size={'md'}
              placeholder={'Наименование'}
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
