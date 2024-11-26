import React from 'react';

import { EMode } from '../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  disabled?: boolean;
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
}

export const Radio = React.forwardRef<HTMLInputElement, IProps>(({ children, mode, disabled, ...props }, ref) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        props.className,
        {
          [s['mode--danger']]: mode === EMode.DANGER,
          [s['mode--success']]: mode === EMode.SUCCESS,
        },
        {
          [s.disabled]: disabled,
        },
      ),
    [props.className, mode, disabled],
  );

  return (
    <label className={className} data-theme="radio">
      <div className={s.radio}>
        <input ref={ref} className={s.element} type="radio" {...props} disabled={disabled} />
        <div className={s.marker} />
      </div>
      {children && <div className={s.content}>{children}</div>}
    </label>
  );
});
