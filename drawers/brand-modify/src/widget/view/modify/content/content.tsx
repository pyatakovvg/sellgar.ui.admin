import React from 'react';

import { Modify } from './modify';
import { Controls } from './controls';

import s from './default.module.scss';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Modify />
      <Controls />
    </div>
  );
};
