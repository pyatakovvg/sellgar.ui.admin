import React from 'react';

import s from './default.module.scss';

export const Window: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.wrapper}>{props.children}</div>;
};
