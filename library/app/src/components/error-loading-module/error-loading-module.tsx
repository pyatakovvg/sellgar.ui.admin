import { Container, Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  error: Error;
}

export const ErrorLoadingModule: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.context}>
        <Container>
          <div className={s.container}>
            <div className={s.header}>
              <Typography size={'body-m'} weight={'semi-bold'}>
                <h3>Что-то пошло не так!</h3>
              </Typography>
            </div>

            {props.error.message && (
              <div className={s.message}>
                <Typography size={'caption-l'} weight={'medium'}>
                  <h4>{props.error.message}</h4>
                </Typography>
              </div>
            )}

            {props.error.stack && (
              <div className={s.stack}>
                <div className={s.content}>
                  <Typography size={'caption-m'} weight={'medium'}>
                    <code className={s.code}>{props.error.stack}</code>
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};
