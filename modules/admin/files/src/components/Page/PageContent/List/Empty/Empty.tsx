import { Paragraph, Substrate } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Empty = React.memo(() => {
  return (
    <Substrate>
      <div className={s.wrapper}>
        <Paragraph>Нет данных для отображения</Paragraph>
      </div>
    </Substrate>
  );
});
