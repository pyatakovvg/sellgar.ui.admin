import React from 'react';

import s from './default.module.scss';

interface IProps {
  displayName: string;
}

export const Role: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper} title={props.displayName}>
      {props.displayName.slice(0, 1)}
    </div>
  );
};
