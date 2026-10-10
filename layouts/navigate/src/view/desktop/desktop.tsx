import { Scrollbar } from '@sellgar/kit';
import { LayoutViewProps } from '@sellgar/app/react';

import React from 'react';

import { Aside } from './aside';

import s from './default.module.scss';

export const Desktop: React.FC<LayoutViewProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Aside />
      {props.kind === 'layout' ? (
        props.children
      ) : (
        <Scrollbar>
          <div className={s.content}>{props.children}</div>
        </Scrollbar>
      )}
    </div>
  );
};
