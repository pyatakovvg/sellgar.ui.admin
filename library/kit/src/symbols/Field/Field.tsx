import { FieldWrapper, Label as LabelField, Caption } from '@sellgar/kit';

import React from 'react';

import { Label } from '../../typography/Label';
import { ErrorMessage } from '../ErrorMessage';

import s from './default.module.scss';

interface IProps {
  error?: string;
  label?: string;
}

export const Field: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <FieldWrapper>
      {props.label && (
        <FieldWrapper.Label>
          <LabelField label={props.label} />
        </FieldWrapper.Label>
      )}
      <FieldWrapper.Content>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child);
          }
          return child;
        })}
      </FieldWrapper.Content>
      {props.error && (
        <FieldWrapper.Caption>
          <Caption leadIcon={'error-warning-line'} caption={props.error} state={'destructive'} />
        </FieldWrapper.Caption>
      )}
    </FieldWrapper>
  );
};
