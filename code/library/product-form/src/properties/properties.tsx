import { Field, Label } from '@sellgar/kit';
import React from 'react';
import * as RHF from 'react-hook-form';

import type { ProductPropertiesFormInput } from '../property-form.input.ts';
import { Empty } from './empty';
import { Property } from './property';

import s from './default.module.css';

export type PropertiesFieldName = 'properties';

interface IProps {
  name: PropertiesFieldName;
  label: string;
}

export const Properties: React.FC<IProps> = (props) => {
  const { control } = RHF.useFormContext<ProductPropertiesFormInput>();
  const properties = RHF.useWatch({ control, name: props.name }) ?? [];

  return (
    <div className={s.wrapper}>
      <Field>
        <Field.Label>
          <div className={s.header}>
            <Label label={props.label} />
          </div>
        </Field.Label>
        <Field.Content>
          {properties.length === 0 ? (
            <Empty />
          ) : (
            <div className={s.content}>
              {properties.map((property, index) => (
                <Property key={property.propertyCode} name={props.name} index={index} property={property} />
              ))}
            </div>
          )}
        </Field.Content>
      </Field>
    </div>
  );
};
