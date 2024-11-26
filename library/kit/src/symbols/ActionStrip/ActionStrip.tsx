import React from 'react';

import s from './default.module.scss';

interface IProps {
  icon?: React.ReactNode;
}

export const ActionStrip: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper} data-theme="action-strip">
      {props.icon && <div className={s.icon}>{props.icon}</div>}
      <div className={s.content}>{props.children}</div>
    </div>
  );
};
