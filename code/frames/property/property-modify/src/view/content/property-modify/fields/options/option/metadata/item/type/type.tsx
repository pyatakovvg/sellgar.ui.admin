import { Caption, Field, Select } from '@sellgar/kit';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { IFormData } from '../../../../../../form.schema.ts';
import { metadataValueTypes } from './type.constants.ts';

interface IProps {
  optionIndex: number;
  index: number;
  inProcess: boolean;
}
type MetadataValueType = IFormData['options'][number]['metadata'][number]['valueType'];

export const Type: React.FC<IProps> = (props) => {
  const { control, setValue } = useFormContext<IFormData>();
  const path = `options.${props.optionIndex}.metadata.${props.index}` as const;
  const handleValueTypeChange = (value: unknown) => {
    const nextValue: MetadataValueType = value === 'COLOR' || value === 'IMAGE' || value === 'ICON' ? value : 'TEXT';
    setValue(`${path}.valueType`, nextValue, { shouldDirty: true, shouldValidate: true });
    if (nextValue === 'COLOR') setValue(`${path}.colorValue`, '#000000', { shouldDirty: true, shouldValidate: true });
  };
  return (
    <Controller
      name={`${path}.valueType`}
      control={control}
      disabled={props.inProcess}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Content>
            <Select
              optionKey={'code'}
              optionValue={'name'}
              options={metadataValueTypes}
              target={error?.message ? 'destructive' : undefined}
              value={field.value}
              disabled={props.inProcess}
              onBlur={field.onBlur}
              onChange={(value) => handleValueTypeChange(value)}
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
