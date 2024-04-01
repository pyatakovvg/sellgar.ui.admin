import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';

export interface IParagraph extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const Paragraph = ({ className, children, ...rest }: IParagraph) => {
  const paragraphClassName = React.useMemo(() => cn(styles.paragraph, className), [className]);
  return (
    <p className={paragraphClassName} {...rest}>
      {children}
    </p>
  );
};
