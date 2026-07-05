import { Field, Caption, Select, Input, Badge, Button, Icon } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import * as Motion from 'framer-motion';

import { ProductFormOptionsControllerInterface } from '../../../../../../classes/controller/product-form-options-controller.interface.ts';
import type { IFormData } from '../../../../../schema.ts';
import s from './property.module.scss';

type PropertiesFieldName = 'properties' | `variants.${number}.properties`;
type PropertyUuidFieldName = `properties.${number}.propertyUuid` | `variants.${number}.properties.${number}.propertyUuid`;
type PropertyValueFieldName = `properties.${number}.value` | `variants.${number}.properties.${number}.value`;
type PropertyRows = IFormData['properties'];
type VariantRows = IFormData['variants'];
type PropertyScope = 'product' | 'variant';

interface PropertyLocation {
  index: number;
  scope: PropertyScope;
  variantIndex?: number;
}

interface IProps {
  fieldId: string;
  index: number;
  name: PropertiesFieldName;
  scope: PropertyScope;
  variantIndex?: number;
  onDelete(): void;
}

const getVariantProperties = (variants: VariantRows, variantIndex?: number): PropertyRows => {
  if (variantIndex === undefined) {
    return [];
  }

  return variants[variantIndex]?.properties ?? [];
};

const getCurrentPropertyUuid = (location: PropertyLocation, productProperties: PropertyRows, variants: VariantRows) => {
  if (location.scope === 'product') {
    return productProperties[location.index]?.propertyUuid;
  }

  return getVariantProperties(variants, location.variantIndex)[location.index]?.propertyUuid;
};

const getBlockedPropertyUuids = (
  location: PropertyLocation,
  productProperties: PropertyRows,
  variants: VariantRows,
  currentPropertyUuid?: string,
) => {
  const blocked = new Set<string>();
  const block = (propertyUuid?: string) => {
    if (propertyUuid && propertyUuid !== currentPropertyUuid) {
      blocked.add(propertyUuid);
    }
  };

  if (location.scope === 'product') {
    productProperties.forEach((item, index) => {
      if (index !== location.index) {
        block(item.propertyUuid);
      }
    });

    variants.forEach((variant) => {
      variant.properties.forEach((item) => block(item.propertyUuid));
    });
  } else {
    productProperties.forEach((item) => block(item.propertyUuid));
    getVariantProperties(variants, location.variantIndex).forEach((item, index) => {
      if (index !== location.index) {
        block(item.propertyUuid);
      }
    });
  }

  return blocked;
};

export const Property: React.FC<IProps> = (props) => {
  const { control } = ReactHookForm.useFormContext<IFormData>();

  const y = Motion.useMotionValue(0);
  const dragControls = Motion.useDragControls();

  const propertyPath = `${props.name}.${props.index}.propertyUuid` as PropertyUuidFieldName;
  const valuePath = `${props.name}.${props.index}.value` as PropertyValueFieldName;
  const productProperties = ReactHookForm.useWatch({ control, name: 'properties' }) ?? [];
  const variants = ReactHookForm.useWatch({ control, name: 'variants' }) ?? [];
  const location = { index: props.index, scope: props.scope, variantIndex: props.variantIndex };
  const currentPropertyUuid = getCurrentPropertyUuid(location, productProperties, variants);
  const { properties } = useLoaderData(ProductFormOptionsControllerInterface);
  const property = React.useMemo(() => properties.find((item) => item.uuid === currentPropertyUuid), [properties, currentPropertyUuid]);
  const blockedPropertyUuids = getBlockedPropertyUuids(location, productProperties, variants, currentPropertyUuid);
  const options = properties.filter((item) => item.uuid === currentPropertyUuid || !blockedPropertyUuids.has(item.uuid));

  return (
    <Motion.Reorder.Item
      className={s.wrapper}
      as={'div'}
      id={props.fieldId}
      value={props.fieldId}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className={s.field} onPointerDown={(event) => dragControls.start(event)}>
        <Icon className={s.icon} icon={Icon.dotsOutLine} />
      </div>
      <div className={s.field}>
        <ReactHookForm.Controller
          control={control}
          name={propertyPath}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Select
                  optionKey={'uuid'}
                  optionValue={'name'}
                  options={options}
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
          control={control}
          name={valuePath}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Content>
                <Input
                  badge={property?.unit ? <Badge label={property?.unit.name} /> : undefined}
                  {...field}
                  value={field.value ?? ''}
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
          type={'button'}
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
