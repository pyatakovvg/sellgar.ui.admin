import { Paragraph, Heading, Button } from '@library/kit';

import React from 'react';

import type { FallbackProps } from 'react-error-boundary';

import s from './default.module.scss';

export const Error: React.FC<FallbackProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Heading variant={'h4'}>{props.error.message}</Heading>
      <Paragraph>
        <code>{props.error.stack}</code>
      </Paragraph>
      <Button onClick={props.resetErrorBoundary}>Обновить</Button>
    </div>
  );
};
