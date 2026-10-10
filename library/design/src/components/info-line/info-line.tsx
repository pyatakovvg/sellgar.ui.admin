import React from 'react';

import s from './default.module.scss';

interface IProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export const InfoLine: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.label}>{props.label}</div>
      <div className={s.value}>{props.value}</div>
    </div>
  );
};
