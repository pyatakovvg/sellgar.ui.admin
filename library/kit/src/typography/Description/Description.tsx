import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'compact';
}

export const Description: React.FC<React.PropsWithChildren<IProps>> = ({ variant, ...props }) => {
  const className = React.useMemo(
    () =>
      cn(s.description, props.className, {
        [s['variant--compact']]: variant === 'compact',
      }),
    [props.className, variant],
  );

  return (
    <p {...props} className={className}>
      {props.children}
    </p>
  );
};
