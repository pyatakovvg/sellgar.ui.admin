import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

type TVariant = 'H2' | 'H3' | 'H4' | 'H5' | 'H6';

interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  variant?: TVariant;
}

const getHeadingElement = (variant?: TVariant): React.ReactElement => {
  switch (variant) {
    case 'H3':
      return <h3 className={s['heading-3']} />;
    case 'H4':
      return <h4 className={s['heading-4']} />;
    case 'H5':
      return <h5 className={s['heading-5']} />;
    case 'H6':
      return <h6 className={s['heading-6']} />;
    default:
      return <h2 className={s['heading-2']} />;
  }
};

export const Heading: React.FC<React.PropsWithChildren<IProps>> = ({ variant, ...props }) => {
  const element = React.useMemo(() => getHeadingElement(variant), [variant]);
  const className = React.useMemo(
    () => cn(s.heading, element.props.className, props.className),
    [element, props.className],
  );

  return React.cloneElement(element, {
    ...props,
    className,
    children: props.children,
  });
};
