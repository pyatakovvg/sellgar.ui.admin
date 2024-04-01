import React from 'react';
import { Link as ReactLink, type LinkProps } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';

export interface ILink extends Omit<LinkProps, 'to'> {
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
  href: string;
  children: React.ReactNode;
}

export const Link = ({ className, href, ...props }: ILink) => {
  const linkClassName = React.useMemo(() => cn(styles.link, className), [props]);

  return (
    <ReactLink className={linkClassName} to={href} {...props}>
      {props.children}
    </ReactLink>
  );
};
