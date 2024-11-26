import React from 'react';

import { Icon } from '../Icon';
import { EMode } from '../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'type'> {
  disabled?: boolean;
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
}

export const Checkbox: React.FC<React.PropsWithChildren<IProps>> = React.forwardRef<HTMLInputElement, IProps>(
  ({ children, disabled, mode, ...props }, ref) => {
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
      <label className={className} data-theme="checkbox">
        <div className={s.checkbox}>
          <input ref={ref} className={s.element} type="checkbox" {...props} disabled={disabled} />
          <div className={s.marker}>
            <Icon icon={'check'} size={17} />
          </div>
        </div>
        {children && <div className={s.content}>{children}</div>}
      </label>
    );
  },
);
