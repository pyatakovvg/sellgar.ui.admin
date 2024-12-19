import { Text, Underlay } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Empty = React.memo(() => {
  return (
    <Underlay>
      <div className={s.wrapper}>
        <Text>Нет данных для отображения</Text>
      </div>
    </Underlay>
  );
});
