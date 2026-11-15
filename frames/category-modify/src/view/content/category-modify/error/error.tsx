import { isHttpException } from '@sellgar/app';
import { useSubmit } from '@sellgar/app/react';
import { Caption } from '@sellgar/kit';

import React from 'react';

import { CategoryModifyControllerInterface } from '../../../../classes/controller/category-modify/category-modify-controller.interface.ts';

import s from './default.module.scss';

export const Error: React.FC = () => {
  const submit = useSubmit(CategoryModifyControllerInterface);
  const error = submit.error;
  if (!error) return null;
  let message = 'Не удалось сохранить категорию. Попробуйте ещё раз.';
  if (
    isHttpException(error) &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'message' in error.response &&
    typeof error.response.message === 'string'
  ) {
    message = error.response.message;
  }
  return (
    <div className={s.wrapper} role={'alert'}>
      <Caption state={'destructive'} caption={message} />
    </div>
  );
};
