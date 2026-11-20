import React from 'react';

import { Typography } from '@sellgar/kit';

import s from './default.module.css';

interface IProps {
  children: React.ReactElement;
  icon: React.ReactNode;
  description?: string;
  size?: React.ComponentProps<typeof Typography>['size'];
}

export const PageTitle: React.FC<IProps> = ({ size = 'h6', ...props }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.heading}>
        <span className={s.icon} aria-hidden={true}>
          {props.icon}
        </span>
        <Typography size={size} weight={'semi-bold'}>
          {props.children}
        </Typography>
      </div>
      {props.description && (
        <Typography size={'caption-m'} weight={'medium'}>
          <p className={s.description}>{props.description}</p>
        </Typography>
      )}
    </div>
  );
};
