import type { PropertyEntity } from '@library/domain';
import React from 'react';
import { ImageValue } from './image';
import { TextValue } from './text';

interface IProps {
  value: PropertyEntity['options'][number]['extras'][number];
}
export const Value: React.FC<IProps> = (props) => {
  if (props.value.type === 'IMAGE') return <ImageValue value={props.value} />;
  return <TextValue value={props.value} />;
};
