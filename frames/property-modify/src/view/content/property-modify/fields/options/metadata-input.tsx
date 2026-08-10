import { Caption, Field, Input } from '@sellgar/kit';

import React from 'react';
import { Controller, type Control } from 'react-hook-form';

import type { IFormData } from '../../form.schema.ts';

type MetadataPath = `options.${number}.metadata.${number}`;

interface IProps {
  control: Control<IFormData>;
  name: `${MetadataPath}.${'textValue' | 'fileUuid' | 'iconCode'}`;
  type?: 'text';
  inProcess: boolean;
  placeholder: string;
}

export const MetadataInput: React.FC<IProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      disabled={props.inProcess}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Content>
            <Input
              {...field}
              value={field.value ?? ''}
              type={props.type ?? 'text'}
              target={error?.message ? 'destructive' : undefined}
              size={'md'}
              placeholder={props.placeholder}
            />
          </Field.Content>
          {error?.message && (
            <Field.Caption>
              <Caption state={'destructive'} caption={error.message} />
            </Field.Caption>
          )}
        </Field>
      )}
    />
  );
};
