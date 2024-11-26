import React from 'react';

import { ErrorMessage } from '../ErrorMessage';

import s from './default.module.scss';

interface IProps {
  error?: string;
}

export const Field: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>{props.children}</div>
      {props.error && (
        <div className={s.error}>
          <ErrorMessage>{props.error}</ErrorMessage>
        </div>
      )}
    </div>
  );
};
