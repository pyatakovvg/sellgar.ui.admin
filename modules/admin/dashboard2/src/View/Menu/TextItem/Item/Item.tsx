import React from 'react';

import { type CustomItemProps } from '../../CustomItem';

import cn from 'classnames';
import s from './default.module.scss';

export const Item: React.FC<React.PropsWithChildren<CustomItemProps>> = (props) => {
  return (
    <div
      className={cn(s.wrapper, {
        [s['is-active']]: props.isActive,
        [s['disabled']]: props.disabled,
      })}
      onClick={props.onClick}
    >
      <p>{props.children}</p>
    </div>
  );
};
