import React from 'react';

import { Icon } from '@/symbols/Icon';

import s from './default.module.scss';

export const Header: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>{props.children}</div>
      <div className={s.close}>
        <Icon icon={'xmark'} />
      </div>
    </div>
  );
};
