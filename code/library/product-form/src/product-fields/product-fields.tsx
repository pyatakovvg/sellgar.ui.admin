import React from 'react';
import type { ProductFieldEntity } from '@library/domain';
import { Typography } from '@sellgar/kit';
import { ProductPropertiesMapper } from '../product-properties.mapper.ts';
import s from './default.module.css';

interface IProps {
  fields: ProductFieldEntity[];
}

export const ProductFields: React.FC<IProps> = (props) => {
  const fields = ProductPropertiesMapper.createProperties(props.fields);
  return (
    <dl className={s.wrapper}>
      {fields.map((field) => (
        <div key={field.propertyCode} className={s.field}>
          <Typography size={'caption-m'}>
            <dt>{field.propertyName}</dt>
          </Typography>
          <Typography size={'body-s'}>
            <dd>
              {field.values
                .map(({ value }) =>
                  typeof value === 'boolean'
                    ? value
                      ? 'Да'
                      : 'Нет'
                    : (field.options.find((option) => option.code === value)?.name ?? value),
                )
                .filter((value) => value !== null && value !== '')
                .join(', ') || '—'}
              {field.unitCode ? ` ${field.unitCode}` : ''}
            </dd>
          </Typography>
        </div>
      ))}
    </dl>
  );
};
