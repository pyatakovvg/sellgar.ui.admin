import { Button, Caption, Field, Icon, Input, Select } from '@sellgar/kit';
import { DeleteBin5LineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as Motion from 'framer-motion';
import { Controller, useFormContext } from 'react-hook-form';

import { metadataValueTypes } from '../../form-values.ts';
import type { IFormData } from '../../form.schema.ts';

import s from './default.module.scss';

interface OptionMetadataRowProps {
  fieldId: string;
  optionIndex: number;
  index: number;
  inProcess: boolean;
  onDelete: () => void;
}

type MetadataPath = `options.${number}.metadata.${number}`;
type MetadataValueType = IFormData['options'][number]['metadata'][number]['valueType'];

export const OptionMetadataRow: React.FC<OptionMetadataRowProps> = ({ fieldId, optionIndex, index, inProcess, onDelete }) => {
  const { control, setValue, watch } = useFormContext<IFormData>();
  const y = Motion.useMotionValue(0);
  const dragControls = Motion.useDragControls();
  const path = `options.${optionIndex}.metadata.${index}` as MetadataPath;
  const valueType = watch(`${path}.valueType`);

  const handleValueTypeChange = (value: MetadataValueType | undefined) => {
    const nextValue = value ?? 'TEXT';

    setValue(`${path}.valueType`, nextValue, { shouldDirty: true, shouldValidate: true });

    if (nextValue === 'COLOR') {
      setValue(`${path}.colorValue`, '#000000', { shouldDirty: true, shouldValidate: true });
    }
  };

  return (
    <Motion.Reorder.Item
      className={s.metadataRow}
      as={'div'}
      id={fieldId}
      value={fieldId}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className={s.metadataDrag} onPointerDown={(event) => dragControls.start(event)}>
        <Icon className={s.optionDragIcon} icon={Icon.dotsOutLine} />
      </div>
      <Controller
        name={`${path}.valueType`}
        control={control}
        disabled={inProcess}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Content>
              <Select
                optionKey={'code'}
                optionValue={'name'}
                options={metadataValueTypes}
                target={error?.message ? 'destructive' : undefined}
                value={field.value}
                disabled={inProcess}
                onBlur={field.onBlur}
                onChange={(value) => handleValueTypeChange(value as MetadataValueType | undefined)}
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
      <div className={s.metadataValue}>{renderMetadataValue({ control, path, valueType, inProcess })}</div>
      <div className={s.metadataControl}>
        <Button.Icon
          type={'button'}
          shape={'rounded'}
          size={'xs'}
          style={'ghost'}
          target={'destructive'}
          leadIcon={<DeleteBin5LineIcon />}
          disabled={inProcess}
          onClick={onDelete}
        />
      </div>
    </Motion.Reorder.Item>
  );
};

interface RenderMetadataValueArgs {
  control: ReturnType<typeof useFormContext<IFormData>>['control'];
  path: MetadataPath;
  valueType: MetadataValueType;
  inProcess: boolean;
}

const renderMetadataValue = ({ control, path, valueType, inProcess }: RenderMetadataValueArgs) => {
  switch (valueType) {
    case 'COLOR':
      return (
        <Controller
          name={`${path}.colorValue`}
          control={control}
          disabled={inProcess}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <div className={s.colorValue}>
                  <input
                    className={s.colorInput}
                    type={'color'}
                    disabled={inProcess}
                    value={/^#[0-9A-Fa-f]{6}$/.test(field.value ?? '') ? (field.value ?? '#000000') : '#000000'}
                    onBlur={field.onBlur}
                    onChange={(event) => field.onChange(event.currentTarget.value.toUpperCase())}
                  />
                  <Input
                    value={field.value ?? ''}
                    target={error?.message ? 'destructive' : undefined}
                    size={'md'}
                    placeholder={'#RRGGBB'}
                    disabled={inProcess}
                    onBlur={field.onBlur}
                    onChange={(event) => field.onChange(event.currentTarget.value.toUpperCase())}
                  />
                </div>
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
    case 'IMAGE':
      return <MetadataInput control={control} name={`${path}.fileUuid`} inProcess={inProcess} placeholder={'UUID файла'} />;
    case 'ICON':
      return <MetadataInput control={control} name={`${path}.iconCode`} inProcess={inProcess} placeholder={'Код иконки'} />;
    case 'TEXT':
    default:
      return <MetadataInput control={control} name={`${path}.textValue`} inProcess={inProcess} placeholder={'Значение'} />;
  }
};

interface MetadataInputProps {
  control: RenderMetadataValueArgs['control'];
  name: `${MetadataPath}.${'textValue' | 'fileUuid' | 'iconCode'}`;
  type?: 'text';
  inProcess: boolean;
  placeholder: string;
}

const MetadataInput: React.FC<MetadataInputProps> = ({ control, name, type = 'text', inProcess, placeholder }) => {
  return (
    <Controller
      name={name}
      control={control}
      disabled={inProcess}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Content>
            <Input
              {...field}
              value={field.value ?? ''}
              type={type}
              target={error?.message ? 'destructive' : undefined}
              size={'md'}
              placeholder={placeholder}
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
