import { Caption, Field, Input } from '@sellgar/kit';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import type { IFormData } from '../../../../form.schema.ts';

interface IProps {
  index: number;
  inProcess: boolean;
}

export const Name: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();
  const {
    field,
    fieldState: { error },
  } = useController({
    name: `options.${props.index}.name`,
    control,
    disabled: props.inProcess,
  });

  return (
    <Field>
      <Field.Content>
        <Input
          {...field}
          size={'md'}
          placeholder={'Название'}
          disabled={props.inProcess}
          target={error?.message ? 'destructive' : undefined}
        />
      </Field.Content>
      {error?.message && (
        <Field.Caption>
          <Caption state={'destructive'} caption={error.message} />
        </Field.Caption>
      )}
    </Field>
  );
};
