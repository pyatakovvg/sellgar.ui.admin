import { Form } from '@library/design';
import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import * as FS from '../../form.schema.ts';

interface CodeFieldProps {
  control: RHF.Control<FS.IFormData>;
  inProcess: boolean;
}

export const CodeField: React.FC<CodeFieldProps> = (props) => {
  const {
    field,
    fieldState: { error },
  } = RHF.useController({
    name: 'code',
    control: props.control,
    disabled: props.inProcess,
  });

  return (
    <Form.Fields>
      <Form.Fields.Field>
        <Field>
          <Field.Label>
            <Label label={'Код'} />
          </Field.Label>
          <Field.Content>
            <Input
              {...field}
              autoFocus={true}
              target={error?.message ? 'destructive' : undefined}
              size={'md'}
              placeholder={'Код'}
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
