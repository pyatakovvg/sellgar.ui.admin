import { Button } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { useInProcess } from '../../../hooks/in-process.hook';

import s from './default.module.scss';

const ActionsComponent: React.FC = () => {
  const inProcess = useInProcess();

  return (
    <div className={s.wrapper}>
      <div className={s.button}>
        <Button type={'submit'} style={'primary'} inProcess={inProcess} disabled={inProcess}>
          Войти
        </Button>
      </div>
      <div className={s.button}>
        <Button type={'button'} style={'ghost'} disabled={inProcess}>
          Забыли пароль?
        </Button>
      </div>
    </div>
  );
};

export const Actions = observer(ActionsComponent);
