import * as App from '@sellgar/app/react';
import { Button, Caption, Field, Select } from '@sellgar/kit';
import { DeleteBin5LineIcon, DotsOutLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as Motion from 'framer-motion';
import * as RHF from 'react-hook-form';

import { PropertyOptionsControllerInterface } from '../../../../classes/controller/property-options/property-options-controller.interface.ts';
import type { IFormData } from '../../../schema.ts';

import { ValueFactory } from './value-factory';

import s from './default.module.scss';

type PropertiesFieldName = 'properties' | `variants.${number}.properties`;
type PropertyUuidFieldName =
  `properties.${number}.propertyUuid` | `variants.${number}.properties.${number}.propertyUuid`;
type PropertyValueFieldName = `properties.${number}.value` | `variants.${number}.properties.${number}.value`;
type PropertyOptionUuidFieldName =
  `properties.${number}.optionUuid` | `variants.${number}.properties.${number}.optionUuid`;
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

const getPropertyUuidPath = (name: PropertiesFieldName, index: number): PropertyUuidFieldName => {
  return name === 'properties' ? `properties.${index}.propertyUuid` : `${name}.${index}.propertyUuid`;
};

const getPropertyValuePath = (name: PropertiesFieldName, index: number): PropertyValueFieldName => {
  return name === 'properties' ? `properties.${index}.value` : `${name}.${index}.value`;
};

const getPropertyOptionUuidPath = (name: PropertiesFieldName, index: number): PropertyOptionUuidFieldName => {
  return name === 'properties' ? `properties.${index}.optionUuid` : `${name}.${index}.optionUuid`;
};

export const Property: React.FC<IProps> = (props) => {
  const { control, setValue } = RHF.useFormContext<IFormData>();

  const y = Motion.useMotionValue(0);
  const dragControls = Motion.useDragControls();

  const propertyPath = getPropertyUuidPath(props.name, props.index);
  const valuePath = getPropertyValuePath(props.name, props.index);
  const optionUuidPath = getPropertyOptionUuidPath(props.name, props.index);
  const productProperties = RHF.useWatch({ control, name: 'properties' }) ?? [];
  const variants = RHF.useWatch({ control, name: 'variants' }) ?? [];
  const location = { index: props.index, scope: props.scope, variantIndex: props.variantIndex };
  const currentPropertyUuid = getCurrentPropertyUuid(location, productProperties, variants);
  const properties = App.useLoaderData(PropertyOptionsControllerInterface).data;
  const property = properties.find((item) => item.uuid === currentPropertyUuid);
  const blockedPropertyUuids = getBlockedPropertyUuids(location, productProperties, variants, currentPropertyUuid);
  const options = properties.filter(
    (item) => item.uuid === currentPropertyUuid || !blockedPropertyUuids.has(item.uuid),
  );

  const handlePropertyChange = (value?: string) => {
    const selectedProperty = properties.find((item) => item.uuid === value);

    setValue(propertyPath, value ?? '', { shouldValidate: true, shouldDirty: true });
    setValue(optionUuidPath, null, { shouldValidate: true, shouldDirty: true });
    setValue(valuePath, selectedProperty?.type === 'BOOLEAN' ? 'false' : '', {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

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
        <div className={s.icon}>
          <DotsOutLineIcon />
        </div>
      </div>
      <div className={s.field}>
        <RHF.Controller
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
                  onChange={handlePropertyChange}
                  onBlur={() => field.onBlur()}
                />
              </Field.Content>
              {error?.message ? (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              ) : null}
            </Field>
          )}
        />
      </div>
      <div className={s.field}>
        <ValueFactory property={property} valuePath={valuePath} optionUuidPath={optionUuidPath} />
      </div>
      <div className={s.field}>
        <Button.Icon
          type={'button'}
          size={'sm'}
          style={'ghost'}
          target={'destructive'}
          leadIcon={<DeleteBin5LineIcon />}
          onClick={props.onDelete}
        />
      </div>
    </Motion.Reorder.Item>
  );
};
