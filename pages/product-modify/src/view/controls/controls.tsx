import { Button } from '@sellgar/kit';

import React from 'react';
// import * as ReactHookForm from 'react-hook-form';

import s from './controls.module.scss';

export const Controls: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Button type={'submit'}>Сохранить</Button>
    </div>
  );
};
