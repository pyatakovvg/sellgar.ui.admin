import React from 'react';

import styles from './default.module.scss';

type TVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface IHeading extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'> {
  variant?: TVariant;
  children: React.ReactNode;
}

export const Heading = ({ children, variant = 'h1', ...rest }: IHeading) => {
  switch (variant) {
    case 'h2':
      return (
        <h2 className={styles.heading} {...rest}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={styles.heading} {...rest}>
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 className={styles.heading} {...rest}>
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 className={styles.heading} {...rest}>
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h6 className={styles.heading} {...rest}>
          {children}
        </h6>
      );
    default:
      return (
        <h1 className={styles.heading} {...rest}>
          {children}
        </h1>
      );
  }
};
