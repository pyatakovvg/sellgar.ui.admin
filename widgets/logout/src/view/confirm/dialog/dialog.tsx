import { Typography, Button } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  onApply(): void;
  onCancel(): void;
}

export const Dialog: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'body-m'} weight={'semi-bold'}>
          <h6>Выход из приложения</h6>
        </Typography>
      </div>
      <div className={s.content}>
        <Typography size={'caption-m'}>
          <p>После выхода нужно будет пройти авторизацию заново</p>
        </Typography>
      </div>
      <div className={s.control}>
        <div className={s.button}>
          <Button size={'sm'} style={'secondary'} onClick={props.onCancel}>
            Отменить
          </Button>
        </div>
        <div className={s.button}>
          <Button autoFocus={true} size={'sm'} target={'destructive'} onClick={props.onApply}>
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};
