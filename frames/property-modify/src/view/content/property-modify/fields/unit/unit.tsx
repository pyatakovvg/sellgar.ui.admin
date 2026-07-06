import { Form } from '@library/design';
import { UnitEntity } from '@library/domain';
import { Caption, Field, Label, Select } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { IFormData } from '../../form.schema.ts';

interface UnitProps {
  inProcess: boolean;
  units: UnitEntity[];
}

export const Unit: React.FC<UnitProps> = ({ inProcess, units }) => {
  const { control } = useFormContext<IFormData>();

  return (
    <Controller
      name={'unitUuid'}
      control={control}
      disabled={inProcess}
      render={({ field, fieldState: { error } }) => (
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Размерность'} />
              </Field.Label>
              <Field.Content>
                <Select
                  target={error?.message ? 'destructive' : undefined}
                  isClearable={true}
                  optionKey={'uuid'}
                  optionValue={'name'}
                  options={units}
                  value={field.value ?? undefined}
                  disabled={inProcess}
                  onBlur={field.onBlur}
                  onChange={(value) => field.onChange(value || undefined)}
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
