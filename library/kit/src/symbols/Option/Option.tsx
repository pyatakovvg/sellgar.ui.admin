import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  isActive?: boolean;
  leftSlot?: React.ReactNode;
}

export const Option: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const className = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.active]: props.isActive,
      }),
    [props.isActive],
  );

  return (
    <div className={className}>
      {props.leftSlot && <div className={s.slot}>{props.leftSlot}</div>}
      {props.children}
    </div>
  );
};
