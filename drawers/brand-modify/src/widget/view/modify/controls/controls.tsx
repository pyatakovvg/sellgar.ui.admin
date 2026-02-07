import { Button } from '@sellgar/kit';

import React from 'react';
import { useFormState } from 'react-hook-form';

import s from './controls.module.scss';

export const Controls: React.FC = () => {
  const formState = useFormState();

  return (
    <div className={s.wrapper}>
      <div className={s.button}>
        <Button type={'reset'} style={'secondary'}>
          Отмена
        </Button>
      </div>
      <div className={s.button}>
        <Button type={'submit'} disabled={formState.isSubmitting}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
