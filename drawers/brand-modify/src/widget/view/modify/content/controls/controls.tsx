import { Button } from '@sellgar/kit';

import React from 'react';
import { useFormState } from 'react-hook-form';

import s from './controls.module.scss';

export const Controls: React.FC = () => {
  const formState = useFormState();

  return (
    <div className={s.wrapper}>
      <Button type={'submit'} disabled={formState.isSubmitting} size={'sm'} target={'info'}>
        Сохранить
      </Button>
    </div>
  );
};
