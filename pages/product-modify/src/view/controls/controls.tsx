import { Button } from '@sellgar/kit';

import React from 'react';

import s from './controls.module.scss';

interface IProps {
  inProcess: boolean;
}

export const Controls: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Button type={'submit'} disabled={props.inProcess} inProcess={props.inProcess}>
        Сохранить
      </Button>
    </div>
  );
};
