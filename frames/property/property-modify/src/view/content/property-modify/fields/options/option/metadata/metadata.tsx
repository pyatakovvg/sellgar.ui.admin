import { Button } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';
import React from 'react';
import * as Motion from 'framer-motion';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { IFormData } from '../../../../form.schema.ts';
import { MetadataFactory } from './factory/metadata.factory.ts';
import { Item } from './item';
import s from './default.module.scss';

interface IProps {
  optionIndex: number;
  inProcess: boolean;
}
export const Metadata: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();
  const metadataFields = useFieldArray({ control, name: `options.${props.optionIndex}.metadata` });
  const handleMetadataReorder = (value: string[]) => {
    if (props.inProcess) return;
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
    <div className={s.wrapper}>
      <div className={s.header}>
        <span className={s.title}>Визуальные данные</span>
        <Button
          type={'button'}
          size={'xs'}
          style={'secondary'}
          leadIcon={<AddLineIcon />}
          disabled={props.inProcess}
          onClick={() => metadataFields.append(MetadataFactory.create())}
        >
          Добавить значение
        </Button>
      </div>

      {metadataFields.fields.length > 0 && (
        <Motion.Reorder.Group
          className={s.list}
          as={'div'}
          axis="y"
          onReorder={handleMetadataReorder}
          values={metadataFields.fields.map((field) => field.id)}
        >
          {metadataFields.fields.map((metadata, metadataIndex) => (
            <Item
              key={metadata.id}
              fieldId={metadata.id}
              optionIndex={props.optionIndex}
              index={metadataIndex}
              inProcess={props.inProcess}
              onDelete={() => metadataFields.remove(metadataIndex)}
            />
          ))}
        </Motion.Reorder.Group>
      )}
    </div>
  );
};
