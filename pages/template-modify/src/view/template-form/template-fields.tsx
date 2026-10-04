import { PropertyKind, type PropertyEntity } from '@library/domain';
import { Button, Caption, Checkbox, Field, Label, Select } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import type { TemplateFormInput } from '../../classes/controller/input/template-form.input.ts';

import s from './template-fields.module.scss';

type FieldCollectionName = 'productFields' | 'variantFields';

interface TemplateFieldsProps {
  readonly name: FieldCollectionName;
  readonly title: string;
  readonly description: string;
  readonly properties: PropertyEntity[];
  readonly inProcess: boolean;
}

interface TemplateFieldRowProps {
  readonly name: FieldCollectionName;
  readonly index: number;
  readonly properties: PropertyEntity[];
  readonly inProcess: boolean;
  readonly first: boolean;
  readonly last: boolean;
  readonly onMoveUp: () => void;
  readonly onMoveDown: () => void;
  readonly onDelete: () => void;
}

const TemplateFieldRow: React.FC<TemplateFieldRowProps> = (props) => {
  const { control, setValue } = useFormContext<TemplateFormInput>();
  const propertyCode = useWatch({ control, name: `${props.name}.${props.index}.propertyCode` });
  const property = props.properties.find((item) => item.code === propertyCode);
  const booleanProperty = property?.kind === PropertyKind.BOOLEAN;

  return (
    <div className={s.row}>
      <Controller
        name={`${props.name}.${props.index}.propertyCode`}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Свойство'} />
            </Field.Label>
            <Field.Content>
              <Select
                options={props.properties}
                optionKey={'code'}
                optionValue={'name'}
                value={field.value}
                placeholder={'Выберите свойство'}
                disabled={props.inProcess}
                target={error ? 'destructive' : undefined}
                onBlur={field.onBlur}
                onChange={(value) => {
                  field.onChange(value ?? '');
                  const selected = props.properties.find((item) => item.code === value);
                  if (selected?.kind === PropertyKind.BOOLEAN) {
                    setValue(`${props.name}.${props.index}.multiple`, false, { shouldDirty: true });
                  }
                }}
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

      <div className={s.flags}>
        <Controller
          name={`${props.name}.${props.index}.required`}
          control={control}
          render={({ field }) => (
            <Checkbox
              label={'Обязательное'}
              checked={field.value}
              disabled={props.inProcess}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />
          )}
        />
        <Controller
          name={`${props.name}.${props.index}.multiple`}
          control={control}
          render={({ field }) => (
            <Checkbox
              label={'Несколько значений'}
              checked={field.value}
              disabled={props.inProcess || booleanProperty}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />
          )}
        />
      </div>

      <div className={s.actions}>
        <Button
          type={'button'}
          size={'xs'}
          style={'secondary'}
          disabled={props.inProcess || props.first}
          onClick={props.onMoveUp}
        >
          Выше
        </Button>
        <Button
          type={'button'}
          size={'xs'}
          style={'secondary'}
          disabled={props.inProcess || props.last}
          onClick={props.onMoveDown}
        >
          Ниже
        </Button>
        <Button
          type={'button'}
          size={'xs'}
          style={'secondary'}
          target={'destructive'}
          disabled={props.inProcess}
          onClick={props.onDelete}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

export const TemplateFields: React.FC<TemplateFieldsProps> = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TemplateFormInput>();
  const fields = useFieldArray({ control, name: props.name });
  const collectionError = errors[props.name];
  const message = collectionError && 'message' in collectionError ? String(collectionError.message ?? '') : '';

  return (
    <section className={s.section}>
      <div className={s.header}>
        <div>
          <h3 className={s.title}>{props.title}</h3>
          <p className={s.description}>{props.description}</p>
        </div>
        <Button
          type={'button'}
          size={'xs'}
          style={'secondary'}
          leadIcon={<AddLineIcon />}
          disabled={props.inProcess}
          onClick={() => fields.append({ propertyCode: '', required: false, multiple: false })}
        >
          Добавить свойство
        </Button>
      </div>

      <div className={s.rows}>
        {fields.fields.length === 0 && <p className={s.empty}>Свойства не добавлены</p>}
        {fields.fields.map((field, index) => (
          <TemplateFieldRow
            key={field.id}
            name={props.name}
            index={index}
            properties={props.properties}
            inProcess={props.inProcess}
            first={index === 0}
            last={index === fields.fields.length - 1}
            onMoveUp={() => fields.move(index, index - 1)}
            onMoveDown={() => fields.move(index, index + 1)}
            onDelete={() => fields.remove(index)}
          />
        ))}
      </div>
      {message && <Caption state={'destructive'} caption={message} />}
    </section>
  );
};
