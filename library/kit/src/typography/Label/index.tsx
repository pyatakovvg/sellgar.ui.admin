import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';

export interface ILabel extends React.HTMLAttributes<HTMLParagraphElement> {
  required?: boolean;
  children: React.ReactNode;
}

export const Label = ({ className, children, required, ...rest }: ILabel) => {
  const labelClassName = React.useMemo(
    () =>
      cn(styles.label, className, {
        [styles['label--required']]: required,
      }),
    [className, required],
  );

  return (
    <p className={labelClassName} {...rest}>
      {children}
    </p>
  );
};
