import type { PropertyEntity } from '@library/domain';
import { Button, Caption } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import * as Motion from 'framer-motion';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { TemplateFormInput } from '../../../classes/controller/input/template-form.input.ts';

import { TemplateFieldRow } from './template-field-row';
import s from './default.module.scss';

type FieldCollectionName = 'productFields' | 'variantFields';

interface TemplateFieldsProps {
  readonly name: FieldCollectionName;
  readonly title: string;
  readonly description: string;
  readonly properties: PropertyEntity[];
  readonly inProcess: boolean;
}

export const TemplateFields: React.FC<TemplateFieldsProps> = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TemplateFormInput>();
  const fields = useFieldArray({ control, name: props.name });
  const collectionError = errors[props.name];
  const message = collectionError && 'message' in collectionError ? String(collectionError.message ?? '') : '';

  const moveField = (from: number, to: number) => {
    if (!props.inProcess && from >= 0 && to >= 0 && to < fields.fields.length && from !== to) {
      fields.move(from, to);
    }
  };

  const handleReorder = (ids: string[]) => {
    const to = ids.findIndex((id, index) => fields.fields[index]?.id !== id);
    if (to < 0) return;
    const from = fields.fields.findIndex((field) => field.id === ids[to]);
    moveField(from, to);
  };

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

      <Motion.MotionConfig reducedMotion={'always'}>
        <Motion.Reorder.Group
          className={s.rows}
          as={'div'}
          axis={'y'}
          values={fields.fields.map((field) => field.id)}
          onReorder={handleReorder}
        >
          {fields.fields.length === 0 && <p className={s.empty}>Свойства не добавлены</p>}
          {fields.fields.map((field, index) => (
            <TemplateFieldRow
              key={field.id}
              name={props.name}
              index={index}
              properties={props.properties}
              inProcess={props.inProcess}
              fieldId={field.id}
              onMove={(offset) => moveField(index, index + offset)}
              onDelete={() => fields.remove(index)}
            />
          ))}
        </Motion.Reorder.Group>
      </Motion.MotionConfig>
      {message && <Caption state={'destructive'} caption={message} />}
    </section>
  );
};
