import { Spinner, ESize } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import s from './default.module.scss';

export const Loading = observer(() => {
  return (
    <div className={s.wrapper}>
      <Spinner size={ESize.MEDIUM} />
    </div>
  );
});
