import { Typography, Button } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  onApply(): void;
  onCancel(): void;
}

export const Dialog: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper} data-qa="logout.confirm">
      <div className={s.header} data-qa="logout.confirm.header">
        <Typography size={'body-s'} weight={'semi-bold'}>
          <h6 data-qa="logout.confirm.header.text">Выход из приложения</h6>
        </Typography>
      </div>
      <div className={s.content} data-qa="logout.confirm.content">
        <Typography size={'caption-l'} weight={'regular'}>
          <p data-qa="logout.confirm.content.text">После выхода нужно будет пройти авторизацию заново</p>
        </Typography>
      </div>
      <div className={s.control} data-qa="logout.confirm.controls">
        <div className={s.button}>
          <Button size={'sm'} style={'ghost'} onClick={props.onCancel} data-qa="logout.confirm.controls.button.cancel">
            Отменить
          </Button>
        </div>
        <div className={s.button}>
          <Button
            size={'sm'}
            target={'info'}
            onClick={props.onApply}
            autoFocus={true}
            data-qa="logout.confirm.controls.button.apply"
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};
