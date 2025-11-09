import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  error: Error;
}

export const Default: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <p>Что-то пошло не так!</p>
        </Typography>
      </div>
      <div className={s.message}>
        <Typography size={'body-m'} weight={'medium'}>
          <p>{props.error.message}</p>
        </Typography>
      </div>
      <div className={s.stack}>
        <div className={s.content}>
          <Typography size={'caption-s'} weight={'medium'}>
            <code className={s.code}>{props.error.stack}</code>
          </Typography>
        </div>
      </div>
    </div>
  );
};
