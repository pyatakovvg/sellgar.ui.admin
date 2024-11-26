import React from 'react';

import s from './default.module.scss';

interface IProps {
  Icon?: React.ReactNode;
}

export const ColorStrip: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper} data-theme="color-strip">
      {props.Icon && <div className={s.icon}>{props.Icon}</div>}
      <div className={s.content}>{props.children}</div>
    </div>
  );
};
