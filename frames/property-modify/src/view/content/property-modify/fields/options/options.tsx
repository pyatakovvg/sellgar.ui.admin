import { Form } from '@library/design';
import { Button, Caption, Field, Label } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as Motion from 'framer-motion';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { createEmptyOption } from '../../form-values.ts';
import type { IFormData } from '../../form.schema.ts';
import { OptionRow } from './option-row.tsx';

import s from './default.module.scss';

interface OptionsProps {
  inProcess: boolean;
}

export const Options: React.FC<OptionsProps> = ({ inProcess }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormData>();
  const optionRows = useFieldArray({ control, name: 'options' });
  const optionsError = typeof errors.options?.message === 'string' ? errors.options.message : undefined;

  const handleReorder = (value: string[]) => {
    const movedId = value.find((id, newIndex) => optionRows.fields[newIndex]?.id !== id);

    if (!movedId) {
      return;
    }

    const newIndex = value.findIndex((id) => id === movedId);
    const oldIndex = optionRows.fields.findIndex((item) => item.id === movedId);

    if (oldIndex >= 0 && newIndex >= 0) {
      optionRows.move(oldIndex, newIndex);
    }
  };

  return (
    <Form.Fields>
      <Form.Fields.Field>
        <Field>
          <Field.Label>
            <div className={s.optionHeader}>
              <Label label={'Опции'} />
              <Button
                type={'button'}
                size={'xs'}
                style={'secondary'}
                leadIcon={<AddLineIcon />}
                disabled={inProcess}
                onClick={() => optionRows.append(createEmptyOption())}
              >
                Добавить опцию
              </Button>
            </div>
          </Field.Label>
          <Field.Content>
            <div className={s.content}>
              <Motion.MotionConfig reducedMotion="always">
                <Motion.Reorder.Group
                  className={s.options}
                  as={'div'}
                  axis="y"
                  onReorder={handleReorder}
                  values={optionRows.fields.map((field) => field.id)}
                >
                  {optionRows.fields.map((option, index) => (
                    <OptionRow
                      key={option.id}
                      fieldId={option.id}
                      index={index}
                      inProcess={inProcess}
                      onDelete={() => optionRows.remove(index)}
                    />
                  ))}
                </Motion.Reorder.Group>
              </Motion.MotionConfig>
            </div>
          </Field.Content>
          {optionsError && (
            <Field.Caption>
              <Caption state={'destructive'} caption={optionsError} />
            </Field.Caption>
          )}
        </Field>
      </Form.Fields.Field>
    </Form.Fields>
  );
};
