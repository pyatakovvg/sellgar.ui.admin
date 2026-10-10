import type { LayoutViewProps } from '@sellgar/app/react';

import React from 'react';

import s from './default.module.scss';

export const LayoutView: React.FC<LayoutViewProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.content}>{props.children}</div>
        <div className={s.divider} />
        <div className={s.info}>
          <div className={s.block}></div>
        </div>
      </div>
    </div>
  );
};
