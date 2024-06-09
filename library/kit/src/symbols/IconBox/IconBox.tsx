import React from 'react';

import type { Mode } from '@/types';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  mode?: Mode;
  disabled?: boolean;
  onClick(): void;
}

export const IconBox: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const wrapperClassName = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['mode--danger']]: props.mode === 'danger',
          [s['mode--success']]: props.mode === 'success',
        },
        {
          [s.disabled]: props.disabled,
        },
      ),
    [props.disabled],
  );

  const handleClick = React.useCallback(() => {
    if (!props.disabled) {
      props.onClick();
    }
  }, [props.disabled]);

  return (
    <div className={wrapperClassName} onClick={handleClick}>
      {props.children}
    </div>
  );
};
