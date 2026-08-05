import type { LayoutViewProps } from '@sellgar/app';

import React from 'react';

import { Controls } from './controls';
import { Header } from './header';

import s from './default.module.scss';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.content}>{props.children}</div>
      <div className={s.controls}>
        <Controls />
      </div>
    </div>
  );
};
