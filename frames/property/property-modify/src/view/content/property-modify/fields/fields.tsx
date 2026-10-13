import { useLoaderData } from '@sellgar/app/react';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PropertyModifyControllerInterface } from '../../../../classes/controller/property-modify/property-modify-controller.interface.ts';
import type { IFormData } from '../form.schema.ts';
import { Code } from './code';
import { Description } from './description';
import { Name } from './name';
import { Options } from './options';
import { Type } from './type';
import { Unit } from './unit';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
}

export const Fields: React.FC<IProps> = (props) => {
  const property = useLoaderData(PropertyModifyControllerInterface);
  const { control } = useFormContext<IFormData>();
  const propertyType = useWatch({ control, name: 'kind' });
  const immutable = Boolean(property);

  return (
    <div className={s.wrapper}>
      <Code inProcess={props.inProcess} immutable={immutable} />
      <Name inProcess={props.inProcess} />
      <Description inProcess={props.inProcess} />
      <Type inProcess={props.inProcess} immutable={immutable} />
      {(propertyType === 'INTEGER' || propertyType === 'DECIMAL') && (
        <Unit inProcess={props.inProcess} immutable={immutable} />
      )}
      {propertyType === 'OPTIONS' && <Options inProcess={props.inProcess} />}
    </div>
  );
};
