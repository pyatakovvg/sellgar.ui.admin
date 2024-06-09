import { Icon, Heading } from '@library/kit';

import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

export const Loading = React.memo(() => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={cn(s.spinner, 'spinner-infinite')}>
          <Icon icon={'spinner'} />
        </div>
        <div className={s.message}>
          <Heading variant={'h5'}>Получение данных</Heading>
        </div>
      </div>
    </div>
  );
});
