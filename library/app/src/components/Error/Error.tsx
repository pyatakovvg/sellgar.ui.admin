import { Paragraph, Heading, Button } from '@library/kit';

import React from 'react';

import type { FallbackProps } from 'react-error-boundary';

import s from './default.module.scss';

export const Error: React.FC<FallbackProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h3'}>Что-то пошло не так!</Heading>
      </div>
      <div className={s.message}>
        <Heading variant={'h4'}>{props.error.message}</Heading>
      </div>
      <div className={s.stack}>
        <Paragraph>
          <code className={s.code}>{props.error.stack}</code>
        </Paragraph>
      </div>
      <div className={s.control}>
        <Button onClick={props.resetErrorBoundary}>Обновить</Button>
      </div>
    </div>
  );
};
