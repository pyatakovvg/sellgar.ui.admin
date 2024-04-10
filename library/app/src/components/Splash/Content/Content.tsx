import { Icon, Heading } from '@library/kit';

import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={cn(s.spinner, 'spinner-infinite')}>
        <Icon icon={'spinner'} />
      </div>
      <div className={s.label}>
        <Heading variant={'h3'}>Запуск приложения</Heading>
      </div>
    </div>
  );
};
