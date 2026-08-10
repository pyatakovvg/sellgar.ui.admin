import { Button, Caption, Field, Icon, Input, Select } from '@sellgar/kit';
import { DeleteBin5LineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as Motion from 'framer-motion';
import { Controller, type Control, useFormContext } from 'react-hook-form';

import { metadataValueTypes } from '../../form-values.ts';
import type { IFormData } from '../../form.schema.ts';
import { MetadataInput } from './metadata-input.tsx';

import s from './default.module.scss';

interface IProps {
  fieldId: string;
  optionIndex: number;
  index: number;
  inProcess: boolean;
  onDelete: () => void;
}

type MetadataPath = `options.${number}.metadata.${number}`;
type MetadataValueType = IFormData['options'][number]['metadata'][number]['valueType'];

const createMetadataPath = (optionIndex: number, index: number): MetadataPath => {
  return `options.${optionIndex}.metadata.${index}`;
};

const isMetadataValueType = (value: unknown): value is MetadataValueType => {
  return value === 'TEXT' || value === 'COLOR' || value === 'IMAGE' || value === 'ICON';
};

export const OptionMetadataRow: React.FC<IProps> = (props) => {
  const { control, setValue, watch } = useFormContext<IFormData>();
  const y = Motion.useMotionValue(0);
  const dragControls = Motion.useDragControls();
  const path = createMetadataPath(props.optionIndex, props.index);
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
      id={props.fieldId}
      value={props.fieldId}
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
                onChange={(value) => handleValueTypeChange(isMetadataValueType(value) ? value : undefined)}
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
      <div className={s.metadataValue}>
        {renderMetadataValue({ control, path, valueType, inProcess: props.inProcess })}
      </div>
      <div className={s.metadataControl}>
        <Button.Icon
          type={'button'}
          shape={'rounded'}
          size={'xs'}
          style={'ghost'}
          target={'destructive'}
          leadIcon={<DeleteBin5LineIcon />}
          disabled={props.inProcess}
          onClick={props.onDelete}
        />
      </div>
    </Motion.Reorder.Item>
  );
};

interface RenderMetadataValueArgs {
  control: Control<IFormData>;
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
      return (
        <MetadataInput control={control} name={`${path}.fileUuid`} inProcess={inProcess} placeholder={'UUID файла'} />
      );
    case 'ICON':
      return (
        <MetadataInput control={control} name={`${path}.iconCode`} inProcess={inProcess} placeholder={'Код иконки'} />
      );
    case 'TEXT':
    default:
      return (
        <MetadataInput control={control} name={`${path}.textValue`} inProcess={inProcess} placeholder={'Значение'} />
      );
  }
};
