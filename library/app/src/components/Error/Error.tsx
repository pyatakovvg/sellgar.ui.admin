import React from 'react';

import type { FallbackProps } from 'react-error-boundary';

import s from './default.module.scss';

export const Error: React.FC<FallbackProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h3>Что-то пошло не так!</h3>
      </div>
      <div className={s.message}>
        <h4>{props.error.message}</h4>
      </div>
      <div className={s.stack}>
        <p>
          <code className={s.code}>{props.error.stack}</code>
        </p>
      </div>
      <div className={s.control}>
        <button onClick={props.resetErrorBoundary}>Обновить</button>
      </div>
    </div>
  );
};
