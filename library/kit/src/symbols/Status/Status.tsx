import React from 'react';

import type { Mode } from '@/types';
import { Description } from '@/typography/Description';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  mode?: Mode;
}

export const Status: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const statusClassName = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s['mode--info']]: props.mode === 'info',
        [s['mode--danger']]: props.mode === 'danger',
        [s['mode--warning']]: props.mode === 'warning',
        [s['mode--success']]: props.mode === 'success',
      }),
    [],
  );

  return (
    <div className={statusClassName}>
      <Description>{props.children}</Description>
    </div>
  );
};
