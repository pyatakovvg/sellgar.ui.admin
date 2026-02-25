import React from 'react';

import { Aside } from './aside';

import s from './default.module.scss';

export const Tablet: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <>
      <Aside />
      <div className={s.content}>{props.children}</div>
    </>
  );
};
