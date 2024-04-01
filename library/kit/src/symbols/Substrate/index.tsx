import React from 'react';

import s from './default.module.scss';

export const Substrate = (props: React.PropsWithChildren) => {
  return (
    <div className={s.wrapper}>{props.children}</div>
  );
};
