import { ButtonLink, Field, Label, Icon } from '@sellgar/kit';

import React from 'react';
import * as Motion from 'framer-motion';
import * as ReactHookForm from 'react-hook-form';

import { Empty } from './empty';
import { Property } from './property';

import { createEmptyProperty } from '../../../../form-values.ts';
import type { IFormData } from '../../../../schema.ts';
import s from './properties.module.scss';

export type PropertiesFieldName = 'properties' | `variants.${number}.properties`;

interface IProps {
  name: PropertiesFieldName;
  label: string;
  scope: 'product' | 'variant';
  variantIndex?: number;
}

export const Properties: React.FC<IProps> = (props) => {
  const { control } = ReactHookForm.useFormContext<IFormData>();
  const { fields, append, remove, move } = ReactHookForm.useFieldArray({
    control,
    name: props.name,
  });

  const handleAddProperty = () => {
    append(createEmptyProperty());
  };

  const handleReorder = (value: string[]) => {
    const movedId = value.find((id, newIndex) => fields[newIndex]?.id !== id);

    if (!movedId) {
      return;
    }

    const newIndex = value.findIndex((id) => id === movedId);
    const oldIndex = fields.findIndex((item) => item.id === movedId);

    if (oldIndex >= 0 && newIndex >= 0) {
      move(oldIndex, newIndex);
    }
  };

  return (
    <div className={s.wrapper}>
      <Field>
        <Field.Label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Label label={props.label} />
            <ButtonLink
              type={'button'}
              size={'xs'}
              target={'info'}
              leadIcon={<Icon icon={Icon.addLine} />}
              onClick={() => handleAddProperty()}
            >
              Добавить свойство
            </ButtonLink>
          </div>
        </Field.Label>
        <Field.Content>
          {fields.length === 0 && <Empty />}
          {fields.length > 0 && (
            <Motion.MotionConfig reducedMotion="always">
              <Motion.Reorder.Group
                className={s.content}
                as={'div'}
                axis="y"
                onReorder={handleReorder}
                values={fields.map((field) => field.id)}
              >
                {fields.map((item, index) => {
                  return (
                    <Property
                      key={item.id}
                      fieldId={item.id}
                      name={props.name}
                      index={index}
                      scope={props.scope}
                      variantIndex={props.variantIndex}
                      onDelete={() => remove(index)}
                    />
                  );
                })}
              </Motion.Reorder.Group>
            </Motion.MotionConfig>
          )}
        </Field.Content>
      </Field>
    </div>
  );
};
