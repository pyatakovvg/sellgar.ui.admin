import type { LayoutViewProps } from '@sellgar/app/react';

import React from 'react';

import s from './default.module.css';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  return <div className={s.wrapper}>{props.children}</div>;
};
