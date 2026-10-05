import { Scrollbar } from '@sellgar/kit';

import React from 'react';

import { Aside } from './aside';

import s from './default.module.scss';

export const Desktop: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <>
      <Aside />
      <Scrollbar>
        <div className={s.content}>{props.children}</div>
      </Scrollbar>
    </>
  );
};
