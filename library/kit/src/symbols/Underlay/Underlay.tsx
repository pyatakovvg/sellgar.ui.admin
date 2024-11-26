import React from 'react';

import { ESize } from '../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  className?: string;
  variant?: 'top' | 'bottom';
  size?: ESize;
}

export const Underlay: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        props.className,
        {
          [s['variant--top']]: props.variant === 'top',
          [s['variant--bottom']]: props.variant === 'bottom',
        },
        {
          [s['size--small']]: props.size === ESize.SM,
          [s['size--middle']]: props.size === ESize.MD,
          [s['size--extra-large']]: props.size === ESize.LG,
        },
      ),
    [props.className, props.variant, props.size],
  );

  return <div className={className}>{props.children}</div>;
};
