import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';

export interface IDescription extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const Description = ({ className, children, ...rest }: IDescription) => {
  const descriptionClassName = React.useMemo(() => cn(styles.description, className), [className]);

  return (
    <span className={descriptionClassName} {...rest}>
      {children}
    </span>
  );
};
