import React from 'react';

import { Spinner } from '@/symbols/Spinner';
import { EMode, ESize, EVariant } from '@/types';

import type { IButton } from './types';

import cn from 'classnames';
import styles from './default.module.scss';

export const Button = ({
  className,
  inProcess,
  size,
  mode,
  variant = EVariant.PRIMARY,
  children,
  leftIcon,
  rightIcon,
  ...rest
}: IButton) => {
  const buttonClassName = React.useMemo(
    () =>
      cn(className, {
        [styles.primary]: variant === EVariant.PRIMARY,
        [styles.secondary]: variant === EVariant.SECONDARY,

        [styles['size--small']]: size === ESize.SMALL,
        [styles['size--large']]: size === ESize.LARGE,

        [styles['mode--danger']]: mode === EMode.DANGER,
        [styles['mode--success']]: mode === EMode.SUCCESS,

        [styles['in-process']]: inProcess,
        [styles['base-button--with-icon']]: leftIcon || rightIcon,
      }),
    [className, inProcess, mode, size, variant, leftIcon, rightIcon, rest.disabled],
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (inProcess) {
      return void 0;
    }
    rest.onClick && rest.onClick(event);
  };

  return (
    <button {...rest} className={buttonClassName} disabled={rest.disabled} onClick={handleClick}>
      <div className={styles.container}>
        {!!leftIcon && <div className={cn(styles.icon, styles['icon--left'])}>{leftIcon}</div>}
        <div className={styles.text}>{children}</div>
        {!!rightIcon && <div className={cn(styles.icon, styles['icon--right'])}>{rightIcon}</div>}
      </div>
      <div className={styles.spinner}>
        <Spinner size={ESize.SMALL} />
      </div>
    </button>
  );
};
