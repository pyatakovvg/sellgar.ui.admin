import { Button, Caption, Field, Icon, Input } from '@sellgar/kit';
import { AddLineIcon, DeleteBin5LineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as Motion from 'framer-motion';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { createEmptyOptionMetadata } from '../../form-values.ts';
import type { IFormData } from '../../form.schema.ts';
import { OptionMetadataRow } from './option-metadata-row.tsx';

import s from './default.module.scss';

interface OptionRowProps {
  fieldId: string;
  index: number;
  inProcess: boolean;
  onDelete: () => void;
}

export const OptionRow: React.FC<OptionRowProps> = ({ fieldId, index, inProcess, onDelete }) => {
  const { control } = useFormContext<IFormData>();
  const metadataFields = useFieldArray({ control, name: `options.${index}.metadata` });
  const y = Motion.useMotionValue(0);
  const dragControls = Motion.useDragControls();

  const handleMetadataReorder = (value: string[]) => {
    const movedId = value.find((id, newIndex) => metadataFields.fields[newIndex]?.id !== id);

    if (!movedId) {
      return;
    }

    const newIndex = value.findIndex((id) => id === movedId);
    const oldIndex = metadataFields.fields.findIndex((item) => item.id === movedId);

    if (oldIndex >= 0 && newIndex >= 0) {
      metadataFields.move(oldIndex, newIndex);
    }
  };

  return (
    <Motion.Reorder.Item
      className={s.option}
      as={'div'}
      id={fieldId}
      value={fieldId}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className={s.optionMain}>
        <div className={s.optionDrag} onPointerDown={(event) => dragControls.start(event)}>
          <Icon className={s.optionDragIcon} icon={Icon.dotsOutLine} />
        </div>
        <Controller
          name={`options.${index}.code`}
          control={control}
          disabled={inProcess}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Input {...field} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Код'} />
              </Field.Content>
              {error?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              )}
            </Field>
          )}
        />
        <Controller
          name={`options.${index}.name`}
          control={control}
          disabled={inProcess}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Input {...field} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Название'} />
              </Field.Content>
              {error?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              )}
            </Field>
          )}
        />
        <div className={s.optionControl}>
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
      </div>

      <div className={s.metadata}>
        <div className={s.metadataHeader}>
          <span className={s.metadataTitle}>Визуальные данные</span>
          <Button
            type={'button'}
            size={'xs'}
            style={'secondary'}
            leadIcon={<AddLineIcon />}
            disabled={inProcess}
            onClick={() => metadataFields.append(createEmptyOptionMetadata())}
          >
            Добавить значение
          </Button>
        </div>

        {metadataFields.fields.length > 0 && (
          <Motion.Reorder.Group
            className={s.metadataList}
            as={'div'}
            axis="y"
            onReorder={handleMetadataReorder}
            values={metadataFields.fields.map((field) => field.id)}
          >
            {metadataFields.fields.map((metadata, metadataIndex) => (
              <OptionMetadataRow
                key={metadata.id}
                fieldId={metadata.id}
                optionIndex={index}
                index={metadataIndex}
                inProcess={inProcess}
                onDelete={() => metadataFields.remove(metadataIndex)}
              />
            ))}
          </Motion.Reorder.Group>
        )}
      </div>
    </Motion.Reorder.Item>
  );
};
