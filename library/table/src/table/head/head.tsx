import React from 'react';

import s from './default.module.scss';

export const Head: React.FC<React.PropsWithChildren> = (props) => {
  return <tr className={s.wrapper}>{props.children}</tr>;
};
