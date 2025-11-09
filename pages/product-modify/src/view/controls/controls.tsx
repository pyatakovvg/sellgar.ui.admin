import { Button } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import s from './controls.module.scss';

export const Controls = () => {
  const { isDirty } = ReactHookForm.useFormState();

  console.log(123, isDirty);

  return (
    <div className={s.wrapper}>
      <Button type={'submit'}>Сохранить</Button>
    </div>
  );
};
