import React from 'react';

import { Spinner } from '../Spinner';
import { Text } from '../../typography/Text';

import { EMode } from '../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  inProcess?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<IProps>> = ({ mode, inProcess, ...props }) => {
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
      ),
    [props.className, mode, inProcess],
  );

  return (
    <button {...props} className={className} data-theme="button">
      <Text>{props.children}</Text>
      {inProcess && (
        <div className={s.spinner}>
          <Spinner variant={'DOTTED'} />
        </div>
      )}
    </button>
  );
};
