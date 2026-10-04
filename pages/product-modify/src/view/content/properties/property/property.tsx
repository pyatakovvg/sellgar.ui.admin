import { Button, ButtonLink, Label } from '@sellgar/kit';
import { AddLineIcon, DeleteBin5LineIcon } from '@sellgar/kit/icons';
import React from 'react';
import * as RHF from 'react-hook-form';

import type { ProductPropertyFormInput } from '../../../../classes/controller/product/input/product-form.input.ts';
import type { IFormData } from '../../../schema.ts';
import type { PropertiesFieldName } from '../properties.tsx';
import { ValueFactory } from './value-factory';

import s from './default.module.scss';

interface IProps {
  index: number;
  name: PropertiesFieldName;
  property: ProductPropertyFormInput;
}

export const Property: React.FC<IProps> = (props) => {
  const { getValues, setValue } = RHF.useFormContext<IFormData>();
  const valuesPath = `${props.name}.${props.index}.values` as const;
  const values = props.property.values.length > 0 ? props.property.values : [{ value: null }];

  const addValue = () => {
    setValue(valuesPath, [...getValues(valuesPath), { value: null }], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const removeValue = (index: number) => {
    const next = getValues(valuesPath).filter((_value, valueIndex) => valueIndex !== index);
    setValue(valuesPath, next.length > 0 ? next : [{ value: null }], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.label}>
        <Label label={`${props.property.propertyName}${props.property.required ? ' *' : ''}`} />
      </div>
      <div className={s.values}>
        {values.map((_value, valueIndex) => (
          <div key={valueIndex} className={s.value}>
            <ValueFactory
              property={props.property}
              valuePath={`${props.name}.${props.index}.values.${valueIndex}.value`}
            />
            {props.property.multiple && values.length > 1 ? (
              <Button.Icon
                type={'button'}
                size={'sm'}
                style={'ghost'}
                target={'destructive'}
                leadIcon={<DeleteBin5LineIcon />}
                onClick={() => removeValue(valueIndex)}
              />
            ) : null}
          </div>
        ))}
        {props.property.multiple ? (
          <ButtonLink type={'button'} size={'xs'} target={'info'} leadIcon={<AddLineIcon />} onClick={addValue}>
            Добавить значение
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
};
