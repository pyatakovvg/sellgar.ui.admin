import { Field, Caption, Select, Input, Badge, Button, Icon } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import * as Motion from 'framer-motion';

import { useProperties } from '../../../../../../hooks/properties.hook.ts';

import s from './property.module.scss';

interface IProps {
  item: object;
  index: number;
  parentIndex: number;
  onDelete(): void;
}

const useSelectedProperty = (propertyUuid: string) => {
  const properties = useProperties();
  return React.useMemo(() => properties.find((item) => item.uuid === propertyUuid), [properties, propertyUuid]);
};

export const Property: React.FC<IProps> = (props) => {
  const { control, watch } = ReactHookForm.useFormContext();

  const y = Motion.useMotionValue(0);
  const dragControls = Motion.useDragControls();

  const propertyWatch = watch(`variants.${props.parentIndex}.properties.${props.index}.propertyUuid`);
  const properties = useProperties();
  const property = useSelectedProperty(propertyWatch);

  return (
    <Motion.Reorder.Item
      className={s.wrapper}
      as={'div'}
      id={'id'}
      value={props.item}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className={s.field} onPointerDown={(event) => dragControls.start(event)}>
        <Icon className={s.icon} icon={Icon.dotsOutLine} />
      </div>
      <div className={s.field}>
        <ReactHookForm.Controller
          name={`variants.${props.parentIndex}.properties.${props.index}.propertyUuid`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Select
                  optionKey={'uuid'}
                  optionValue={'name'}
                  options={properties}
                  target={error?.message ? 'destructive' : undefined}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  onBlur={() => field.onBlur()}
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
      <div className={s.field}>
        <ReactHookForm.Controller
          name={`variants.${props.parentIndex}.properties.${props.index}.value`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Input
                  badge={property?.unit ? <Badge label={property?.unit.name} /> : undefined}
                  {...field}
                  target={error?.message ? 'destructive' : undefined}
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
      <div className={s.field}>
        <Button
          form={'icon'}
          size={'sm'}
          style={'ghost'}
          target={'destructive'}
          leadIcon={<Icon icon={Icon.deleteBin5Line} />}
          onClick={() => props.onDelete()}
        />
      </div>
    </Motion.Reorder.Item>
  );
};
