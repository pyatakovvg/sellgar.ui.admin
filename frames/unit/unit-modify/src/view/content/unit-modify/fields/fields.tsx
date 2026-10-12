import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { IFormData } from '../form.schema.ts';
import { CodeField } from './code-field';
import { NameField } from './name-field';
import { SymbolField } from './symbol-field';
import { DescriptionField } from './description-field';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  immutable: boolean;
}

export const Fields: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <CodeField control={control} inProcess={props.inProcess} immutable={props.immutable} />
      <NameField control={control} inProcess={props.inProcess} />
      <SymbolField control={control} inProcess={props.inProcess} />
      <DescriptionField control={control} inProcess={props.inProcess} />
    </div>
  );
};
