import React from 'react';
import { Paragraph } from '@library/kit';

import s from './default.module.scss';

interface IProps {
  icon: React.ReactNode;
  onClick(): void;
}

export const Action: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper} onClick={() => props.onClick()}>
      <div className={s.icon}>{props.icon}</div>
      <div className={s.content}>
        <Paragraph>{props.children}</Paragraph>
      </div>
    </div>
  );
};
