import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  isFull: boolean;
  isActive?: boolean;
  icon: React.ReactElement;
}

export const Item = (props: React.PropsWithChildren<IProps>) => {
  const wrapperClassName = React.useMemo(() => {
    return cn(s.wrapper, {
      [s.active]: props.isActive,
    });
  }, [props.isActive]);

  return (
    <div className={wrapperClassName}>
      <div className={s.icon}>{props.icon}</div>
      {props.isFull && <div className={s.content}>{props.children}</div>}
    </div>
  );
};
