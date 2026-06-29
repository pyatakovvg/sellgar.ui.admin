import { Form } from '@library/design';
import { PropertyEntity, PropertyGroupEntity, UnitEntity } from '@library/domain';
import { Caption, Field, Input, Label, Select, Textarea } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { PropertyGroupListControllerInterface } from '../../../../classes/controller/property-group-list-controller.interface.ts';
import { UnitListControllerInterface } from '../../../../classes/controller/unit-list-controller.interface.ts';
import type { IFormData } from '../form.schema.ts';

import s from './default.module.scss';

interface FieldsProps {
  inProcess: boolean;
}

const propertyTypes: Array<{ code: PropertyEntity['type']; name: string }> = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'CHECKBOX', name: 'Чекбокс' },
  { code: 'RADIO', name: 'Радио кнопка' },
  { code: 'DATE', name: 'Дата' },
  { code: 'RANGE', name: 'Диапазон' },
];

export const Fields: React.FC<FieldsProps> = (props) => {
  const groups = useLoaderData(PropertyGroupListControllerInterface) as PropertyGroupEntity[];
  const units = useLoaderData(UnitListControllerInterface) as UnitEntity[];
  const { control } = useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <Controller
        name={'groupUuid'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Группа'} />
                </Field.Label>
                <Field.Content>
                  <Select
                    target={error?.message ? 'destructive' : undefined}
                    optionKey={'uuid'}
                    optionValue={'name'}
                    options={groups}
                    value={field.value}
                    disabled={props.inProcess}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
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
      <Controller
        name={'code'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Код'} />
                </Field.Label>
                <Field.Content>
                  <Input {...field} autoFocus={true} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Код'} />
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
      <Controller
        name={'name'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Наименование'} />
                </Field.Label>
                <Field.Content>
                  <Input {...field} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Наименование'} />
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
      <Controller
        name={'description'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Описание'} />
                </Field.Label>
                <Field.Content>
                  <Textarea {...field} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Описание'} />
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
      <Controller
        name={'type'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Тип'} />
                </Field.Label>
                <Field.Content>
                  <Select
                    target={error?.message ? 'destructive' : undefined}
                    optionKey={'code'}
                    optionValue={'name'}
                    options={propertyTypes}
                    value={field.value}
                    disabled={props.inProcess}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
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
      <Controller
        name={'unitUuid'}
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
                    optionKey={'uuid'}
                    optionValue={'name'}
                    options={units}
                    value={field.value ?? undefined}
                    disabled={props.inProcess}
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
    </div>
  );
};
