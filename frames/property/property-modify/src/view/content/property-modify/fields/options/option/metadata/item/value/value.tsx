import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { IFormData } from '../../../../../../form.schema.ts';
import { Color } from './color';
import { MetadataInput } from './input';

interface IProps {
  path: `options.${number}.metadata.${number}`;
  inProcess: boolean;
}

export const Value: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();
  const valueType = useWatch({ control, name: `${props.path}.valueType` });
  if (valueType === 'COLOR') return <Color path={props.path} inProcess={props.inProcess} />;
  if (valueType === 'IMAGE')
    return (
      <MetadataInput name={`${props.path}.imageUuid`} inProcess={props.inProcess} placeholder={'UUID изображения'} />
    );
  return (
    <MetadataInput
      name={`${props.path}.textValue`}
      inProcess={props.inProcess}
      placeholder={valueType === 'ICON' ? 'Код иконки' : 'Значение'}
    />
  );
};
