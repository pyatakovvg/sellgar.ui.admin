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
    <div className={s.wrapper}>
      {props.label && (
        <div className={s.label}>
          <Label>{props.label}</Label>
        </div>
      )}
      <div className={s.content}>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child);
          }
          return child;
        })}
      </div>
      {props.error && (
        <div className={s.error}>
          <ErrorMessage>{props.error}</ErrorMessage>
        </div>
      )}
    </div>
  );
};
