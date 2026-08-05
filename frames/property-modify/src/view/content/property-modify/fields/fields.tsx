import { UnitEntity } from '@library/domain';
import { useLoaderData } from '@sellgar/app';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { UnitListControllerInterface } from '../../../../classes/controller/unit-list-controller.interface.ts';
import type { IFormData } from '../form.schema.ts';
import { Code } from './code';
import { Description } from './description';
import { Name } from './name';
import { Options } from './options';
import { Type } from './type';
import { Unit } from './unit';

import s from './default.module.scss';

interface FieldsProps {
  inProcess: boolean;
}

export const Fields: React.FC<FieldsProps> = ({ inProcess }) => {
  const units = useLoaderData(UnitListControllerInterface) as UnitEntity[];
  const { control } = useFormContext<IFormData>();
  const propertyType = useWatch({ control, name: 'type' });

  return (
    <div className={s.wrapper}>
      <Code inProcess={inProcess} />
      <Name inProcess={inProcess} />
      <Description inProcess={inProcess} />
      <Type inProcess={inProcess} />
      {propertyType === 'NUMBER' && <Unit inProcess={inProcess} units={units} />}
      {propertyType === 'OPTION' && <Options inProcess={inProcess} />}
    </div>
  );
};
