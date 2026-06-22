import { Layout } from '@tiyn/app';
import type { LayoutViewProps } from '@tiyn/app';

import React from 'react';

import s from './default.module.scss';

const BaseLayoutView: React.FC<LayoutViewProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>{props.children}</div>
    </div>
  );
};

@Layout({
  view: BaseLayoutView,
})
export class BaseLayout {}
