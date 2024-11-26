import React from 'react';

import { Description } from '../../typography/Description';

import s from './default.module.scss';

export const ErrorMessage: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.error} data-theme="error-message">
      <Description>{props.children}</Description>
    </div>
  );
};
