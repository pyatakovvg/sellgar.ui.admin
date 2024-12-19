import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const Label: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const className = React.useMemo(() => cn(s.description, props.className), [props.className]);

  return (
    <p {...props} className={className}>
      {props.children}
    </p>
  );
};
