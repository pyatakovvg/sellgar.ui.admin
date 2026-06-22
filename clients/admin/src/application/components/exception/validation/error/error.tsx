import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  error: any;
}

export const Error: React.FC<IProps> = (props) => {
  const property = props.error.property;
  const value = props.error.value instanceof String ? props.error.value : '---';
  const descriptions = props.error?.constraints ?? {};

  let message = '';
  if (props.error.target) {
    message = props.error.target;
  }
  if (property) {
    message = message + `['${property}']`;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <Typography size={'caption-l'} weight={'medium'}>
          <span>{message}</span>
        </Typography>
      </div>
      <div className={s.field}>
        <Typography size={'caption-m'} weight={'semi-bold'}>
          <span className={s.label}>Принимаемое значение:</span>
        </Typography>
        &nbsp;
        <Typography size={'caption-m'} weight={'medium'}>
          <span>{value ?? 'нет значения'}</span>
        </Typography>
      </div>
      <div className={s.field}>
        <div className={s['field-description']}>
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <span>Описание:</span>
          </Typography>
        </div>
        <div className={s['field-content']}>
          {Object.keys(descriptions).map((key, index) => (
            <Typography size={'caption-s'} weight={'medium'} key={index}>
              <span>- {descriptions[key]}</span>
            </Typography>
          ))}
        </div>
      </div>
    </div>
  );
};
