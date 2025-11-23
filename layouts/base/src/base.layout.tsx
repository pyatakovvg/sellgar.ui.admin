import React from 'react';

import s from './default.module.scss';

export const BaseLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>{props.children}</div>
    </div>
  );
};
