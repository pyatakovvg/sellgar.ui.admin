import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  active: boolean;
  number: number;
  onClick(page: number): void;
}

export const Number: React.FC<IProps> = (props) => {
  const wrapperClassName = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.active]: props.active,
      }),
    [props],
  );

  const handleClick = () => {
    props.onClick(props.number);
  };

  return (
    <div className={wrapperClassName} onClick={handleClick}>
      <span className={s.text}>{props.number}</span>
    </div>
  );
};
