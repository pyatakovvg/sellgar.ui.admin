import { Form } from '@library/design';
import { useLoaderData } from '@sellgar/app/react';
import { UnitListControllerInterface } from '../../../../../classes/controller/unit-list/unit-list-controller.interface.ts';
import { Caption, Field, Label, Select } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { IFormData } from '../../form.schema.ts';

interface IProps {
  inProcess: boolean;
  immutable: boolean;
}

export const Unit: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();
  const units = useLoaderData(UnitListControllerInterface);

  return (
    <Controller
      name={'unitCode'}
      control={control}
      disabled={props.inProcess}
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
                  optionKey={'code'}
                  optionValue={'name'}
                  options={units}
                  value={field.value ?? undefined}
                  disabled={props.inProcess || props.immutable}
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
