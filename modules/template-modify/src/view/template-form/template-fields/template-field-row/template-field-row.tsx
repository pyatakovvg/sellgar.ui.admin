import { PropertyKind, type PropertyEntity } from '@library/domain';
import { Button, Caption, Checkbox, Field, Label, Select } from '@sellgar/kit';
import { DragMove2LineIcon } from '@sellgar/kit/icons';
import * as Motion from 'framer-motion';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { TemplateFormInput } from '../../../../classes/controller/input/template-form.input.ts';
import s from './default.module.scss';

type FieldCollectionName = 'productFields' | 'variantFields';

interface TemplateFieldRowProps {
  readonly name: FieldCollectionName;
  readonly index: number;
  readonly properties: PropertyEntity[];
  readonly inProcess: boolean;
  readonly fieldId: string;
  readonly onMove: (offset: number) => void;
  readonly onDelete: () => void;
}

export const TemplateFieldRow: React.FC<TemplateFieldRowProps> = (props) => {
  const { control, setValue } = useFormContext<TemplateFormInput>();
  const propertyCode = useWatch({ control, name: `${props.name}.${props.index}.propertyCode` });
  const property = props.properties.find((item) => item.code === propertyCode);
  const booleanProperty = property?.kind === PropertyKind.BOOLEAN;
  const dragControls = Motion.useDragControls();

  return (
    <Motion.Reorder.Item
      className={s.row}
      as={'div'}
      value={props.fieldId}
      dragListener={false}
      dragControls={dragControls}
      drag={props.inProcess ? false : 'y'}
    >
      <span className={s.handle}>
        <Button.Icon
          type={'button'}
          size={'xs'}
          style={'ghost'}
          aria-label={`Перетащить свойство ${property?.name ?? props.index + 1}`}
          title={'Перетащите для изменения порядка'}
          leadIcon={<DragMove2LineIcon />}
          disabled={props.inProcess}
          onPointerDown={(event) => {
            if (!props.inProcess) dragControls.start(event);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              event.preventDefault();
              props.onMove(event.key === 'ArrowUp' ? -1 : 1);
            }
          }}
        />
      </span>
      <div className={s.property}>
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
      </div>

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
          target={'destructive'}
          disabled={props.inProcess}
          onClick={props.onDelete}
        >
          Удалить
        </Button>
      </div>
    </Motion.Reorder.Item>
  );
};
