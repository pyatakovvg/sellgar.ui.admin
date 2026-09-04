import { useLoaderData } from '@sellgar/app/react';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { UnitListControllerInterface } from '../../../../classes/controller/unit-list/unit-list-controller.interface.ts';
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
  const units = useLoaderData(UnitListControllerInterface);
  const { control } = useFormContext<IFormData>();
  const propertyType = useWatch({ control, name: 'type' });

  return (
    <div className={s.wrapper}>
      <Code inProcess={props.inProcess} />
      <Name inProcess={props.inProcess} />
      <Description inProcess={props.inProcess} />
      <Type inProcess={props.inProcess} />
      {propertyType === 'NUMBER' && <Unit inProcess={props.inProcess} units={units} />}
      {propertyType === 'OPTION' && <Options inProcess={props.inProcess} />}
    </div>
  );
};
