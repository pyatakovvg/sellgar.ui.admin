import React from 'react';

import { EMode } from '../../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  className?: string;
  disabled?: boolean;
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
}

export const FieldWrapper: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        props.className,
        {
          [s['disabled']]: props.disabled,
        },
        {
          [s['mode--danger']]: props.mode === EMode.DANGER,
          [s['mode--success']]: props.mode === EMode.SUCCESS,
        },
      ),
    [props.className, props.mode],
  );

  return <div className={className}>{props.children}</div>;
};
