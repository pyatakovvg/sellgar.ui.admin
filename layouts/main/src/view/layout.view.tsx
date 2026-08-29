import type { LayoutViewProps } from '@sellgar/app-v2/react';

import React from 'react';

import s from './default.module.scss';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  return <div className={s.wrapper}>{props.children}</div>;
};
