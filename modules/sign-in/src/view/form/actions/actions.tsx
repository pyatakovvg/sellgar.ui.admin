import { Button } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import type { SignInInput } from '../../../classes/controller/sign-in/input/sign-in.input.ts';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const {
    formState: { isSubmitting },
  } = ReactHookForm.useFormContext<SignInInput>();

  return (
    <div className={s.wrapper}>
      <div className={s.button}>
        <Button type={'submit'} style={'primary'} inProcess={isSubmitting} disabled={isSubmitting}>
          Войти
        </Button>
      </div>
      <div className={s.button}>
        <Button type={'button'} style={'ghost'} disabled={isSubmitting}>
          Забыли пароль?
        </Button>
      </div>
    </div>
  );
};
