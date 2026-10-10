import React from 'react';

import { Name } from './name';
import { Description } from './description';
import { Properties } from './properties';

import s from './default.module.scss';

export const Fields: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <Name />
      </div>
      <div className={s.field}>
        <Description />
      </div>
      <div className={s.field}>
        <Properties />
      </div>
    </div>
  );
};
