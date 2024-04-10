import { Icon } from '@library/kit';

import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

export const Spinner: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={cn(s.spinner, 'spinner-infinite')}>
          <Icon icon={'spinner'} />
        </div>
      </div>
    </div>
  );
};
