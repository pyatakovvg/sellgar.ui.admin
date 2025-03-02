import React from 'react';

import s from './default.module.scss';

interface IProps {}

export const Underlay: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return <div className={s.wrapper}>{props.children}</div>;
};
