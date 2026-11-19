import React from 'react';

import { useException } from '@sellgar/app/react';
import { Button, Typography } from '@sellgar/kit';

import s from './default.module.css';

export const Exception: React.FC = () => {
  const { recovery } = useException();

  return (
    <div className={s.wrapper} role="alert">
      <Typography size="body-m" weight="semi-bold">
        <p className={s.title}>Не удалось загрузить корзину</p>
      </Typography>
      <p className={s.message}>Попробуйте загрузить данные ещё раз.</p>
      {recovery.retry ? (
        <Button
          type="button"
          style="secondary"
          disabled={recovery.retry.inProcess}
          onClick={() => void recovery.retry?.()}
        >
          Повторить
        </Button>
      ) : null}
    </div>
  );
};
