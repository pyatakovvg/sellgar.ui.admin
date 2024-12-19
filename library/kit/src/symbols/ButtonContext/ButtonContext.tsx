import React from 'react';

import { Text } from '../../typography/Text';

import { EMode, ESize } from '../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends React.ButtonHTMLAttributes<Omit<HTMLButtonElement, 'type'>> {
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  size?: ESize.SM | ESize.MD | ESize.XL;
  inProcess?: boolean;
}

export const ButtonContext: React.FC<React.PropsWithChildren<IProps>> = ({ mode, size, inProcess, ...props }) => {
  const className = React.useMemo(
    () =>
      cn(
        s.element,
        props.className,
        {
          [s['mode--danger']]: mode === EMode.DANGER,
          [s['mode--success']]: mode === EMode.SUCCESS,
        },
        {
          [s['in-process']]: inProcess,
        },
        {
          [s['size--sm']]: size === ESize.SM,
        },
      ),
    [props.className, mode, inProcess],
  );

  return (
    <button {...props} type={'button'} className={className}>
      <Text>{props.children}</Text>
    </button>
  );
};
