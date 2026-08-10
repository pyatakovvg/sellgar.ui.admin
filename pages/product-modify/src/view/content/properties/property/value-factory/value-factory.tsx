import type { PropertyEntity } from '@library/domain';
import { Badge, Caption, Checkbox, Datepicker, Field, Input, Select } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import type { IFormData } from '../../../../schema.ts';

type PropertyValueFieldName = `properties.${number}.value` | `variants.${number}.properties.${number}.value`;
type PropertyOptionUuidFieldName =
  `properties.${number}.optionUuid` | `variants.${number}.properties.${number}.optionUuid`;

interface IProps {
  property?: PropertyEntity;
  valuePath: PropertyValueFieldName;
  optionUuidPath: PropertyOptionUuidFieldName;
}

export const ValueFactory: React.FC<IProps> = (props) => {
  const { control, setValue, getFieldState, formState } = RHF.useFormContext<IFormData>();
  const valueState = getFieldState(props.valuePath, formState);
  const optionState = getFieldState(props.optionUuidPath, formState);

  switch (props.property?.type) {
    case 'OPTION': {
      const errorMessage = optionState.error?.message ?? valueState.error?.message;

      return (
        <RHF.Controller
          control={control}
          name={props.optionUuidPath}
          render={({ field }) => (
            <Field>
              <Field.Content>
                <Select
                  optionKey={'uuid'}
                  optionValue={'name'}
                  options={props.property?.options ?? []}
                  target={errorMessage ? 'destructive' : undefined}
                  value={field.value ?? undefined}
                  onChange={(value) => {
                    const option = props.property?.options?.find((item) => item.uuid === value);

                    field.onChange(value ?? null);
                    setValue(props.valuePath, option?.code ?? '', { shouldValidate: true, shouldDirty: true });
                  }}
                  onBlur={field.onBlur}
                />
              </Field.Content>
              {errorMessage ? (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errorMessage} />
                </Field.Caption>
              ) : null}
            </Field>
          )}
        />
      );
    }
    case 'BOOLEAN':
      return (
        <RHF.Controller
          control={control}
          name={props.valuePath}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Checkbox
                  checked={field.value === 'true'}
                  label={'Да'}
                  onBlur={field.onBlur}
                  onChange={(event) => field.onChange(event.currentTarget.checked ? 'true' : 'false')}
                />
              </Field.Content>
              {error?.message ? (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              ) : null}
            </Field>
          )}
        />
      );
    case 'DATE':
      return (
        <RHF.Controller
          control={control}
          name={props.valuePath}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Datepicker
                  value={field.value ? field.value : undefined}
                  target={error?.message ? 'destructive' : undefined}
                  onChange={(value) => field.onChange(value ?? '')}
                  onBlur={field.onBlur}
                />
              </Field.Content>
              {error?.message ? (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              ) : null}
            </Field>
          )}
        />
      );
    default:
      return (
        <RHF.Controller
          control={control}
          name={props.valuePath}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Input
                  badge={props.property?.unit ? <Badge label={props.property.unit.name} /> : undefined}
                  {...field}
                  type={props.property?.type === 'NUMBER' ? 'number' : 'text'}
                  value={field.value ?? ''}
                  target={error?.message ? 'destructive' : undefined}
                />
              </Field.Content>
              {error?.message ? (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              ) : null}
            </Field>
          )}
        />
      );
  }
};
