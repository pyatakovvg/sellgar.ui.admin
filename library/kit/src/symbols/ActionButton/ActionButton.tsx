import React from 'react';

import { EMode } from '../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends React.AnchorHTMLAttributes<HTMLDivElement> {
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  icon: React.ReactNode;
}

export const ActionButton: React.FC<React.PropsWithChildren<IProps>> = ({ mode, icon, ...props }) => {
  const className = React.useMemo(
    () =>
      cn(s.element, props.className, {
        [s['mode--danger']]: mode === EMode.DANGER,
        [s['mode--success']]: mode === EMode.SUCCESS,
      }),
    [props.className, mode],
  );

  return (
    <div className={className} data-theme="action-button" role="button">
      <div className={s.icon}>{icon}</div>
      <div className={s.text}>{props.children}</div>
    </div>
  );
};
