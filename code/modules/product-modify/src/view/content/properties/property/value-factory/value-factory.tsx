import { PropertyKind } from '@library/domain';
import { Badge, Caption, Datepicker, Field, Input, Select } from '@sellgar/kit';
import React from 'react';
import * as RHF from 'react-hook-form';

import type { ProductPropertyFormInput } from '../../../../../classes/controller/product/input/product-form.input.ts';
import type { IFormData } from '../../../../schema.ts';

interface IProps {
  property: ProductPropertyFormInput;
  valuePath:
    `properties.${number}.values.${number}.value` | `variants.${number}.properties.${number}.values.${number}.value`;
}

const booleanOptions = [
  { code: 'true', name: 'Да' },
  { code: 'false', name: 'Нет' },
];

export const ValueFactory: React.FC<IProps> = (props) => {
  const { control } = RHF.useFormContext<IFormData>();

  if (props.property.kind === PropertyKind.OPTIONS) {
    return (
      <RHF.Controller
        control={control}
        name={props.valuePath}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Content>
              <Select
                optionKey={'code'}
                optionValue={'name'}
                options={props.property.options}
                target={error?.message ? 'destructive' : undefined}
                value={typeof field.value === 'string' ? field.value : undefined}
                onChange={(value) => field.onChange(value ?? null)}
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
  }

  if (props.property.kind === PropertyKind.BOOLEAN) {
    return (
      <RHF.Controller
        control={control}
        name={props.valuePath}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Content>
              <Select
                optionKey={'code'}
                optionValue={'name'}
                options={booleanOptions}
                target={error?.message ? 'destructive' : undefined}
                value={typeof field.value === 'boolean' ? String(field.value) : undefined}
                onChange={(value) => field.onChange(value === undefined ? null : value === 'true')}
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
  }

  if (props.property.kind === PropertyKind.DATE) {
    return (
      <RHF.Controller
        control={control}
        name={props.valuePath}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Content>
              <Datepicker
                value={typeof field.value === 'string' && field.value ? field.value : undefined}
                target={error?.message ? 'destructive' : undefined}
                onChange={(value) => field.onChange(value ?? null)}
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
  }

  return (
    <RHF.Controller
      control={control}
      name={props.valuePath}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Content>
            <Input
              badge={props.property.unitCode ? <Badge label={props.property.unitCode} /> : undefined}
              name={field.name}
              ref={field.ref}
              type={
                props.property.kind === PropertyKind.INTEGER || props.property.kind === PropertyKind.DECIMAL
                  ? 'number'
                  : 'text'
              }
              value={typeof field.value === 'string' ? field.value : ''}
              target={error?.message ? 'destructive' : undefined}
              onChange={field.onChange}
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
};
