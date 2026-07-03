import React from 'react';
import * as RHF from 'react-hook-form';

import * as FS from '../form.schema.ts';

import { ImageField } from './image-field';
import { CodeField } from './code-field';
import { NameField } from './name-field';
import { DescriptionField } from './description-field';

import s from './default.module.scss';

interface FieldsProps {
  inProcess: boolean;
}

export const Fields: React.FC<FieldsProps> = (props) => {
  const { control } = RHF.useFormContext<FS.IFormData>();

  return (
    <div className={s.wrapper}>
      <ImageField control={control} inProcess={props.inProcess} />
      <CodeField control={control} inProcess={props.inProcess} />
      <NameField control={control} inProcess={props.inProcess} />
      <DescriptionField control={control} inProcess={props.inProcess} />
    </div>
  );
};
