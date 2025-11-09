import { ButtonLink, Field, Label, Icon } from '@sellgar/kit';
import { PropertyEntity } from '@library/domain';

import React from 'react';
import * as Motion from 'framer-motion';
import * as ReactHookForm from 'react-hook-form';

import { Empty } from './empty';
import { Property } from './property';

import s from './properties.module.scss';

interface IProps {
  index: number;
}

export const Properties: React.FC<IProps> = (props) => {
  const { control } = ReactHookForm.useFormContext();
  const { fields, prepend, remove, move } = ReactHookForm.useFieldArray({
    control,
    name: `variants.${props.index}.properties`,
  });

  const handleAddProperty = () => {
    prepend(new PropertyEntity());
  };

  return (
    <div className={s.wrapper}>
      <Field>
        <Field.Label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Label label={'Свойства товара'} />
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
                onReorder={(value) => {
                  const movedItem = value.find((item, newIndex) => fields[newIndex]?.id !== item.id);

                  if (movedItem) {
                    const newIndex = value.findIndex((item) => item.id === movedItem.id);
                    const oldIndex = fields.findIndex((item) => item.id === movedItem.id);

                    move(oldIndex, newIndex);
                  }
                }}
                values={fields}
              >
                {fields.map((item, index) => {
                  return (
                    <Property
                      key={item.id}
                      item={item}
                      parentIndex={props.index}
                      index={index}
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
