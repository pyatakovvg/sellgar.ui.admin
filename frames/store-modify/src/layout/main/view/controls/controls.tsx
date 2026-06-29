import { Button } from '@sellgar/kit';
import { useController, useSubmit } from '@tiyn/app';

import React from 'react';

import { StoreModifyControllerInterface } from '../../../../classes/controller/store-modify-controller.interface.ts';
import { STORE_MODIFY_FORM_ID } from '../../../../constants';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const submit = useSubmit(StoreModifyControllerInterface);
  const controller = useController(StoreModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} disabled={submit.inProcess} size={'sm'} style={'secondary'} onClick={() => controller.toList()}>
        Отмена
      </Button>
      <Button type={'submit'} form={STORE_MODIFY_FORM_ID} disabled={submit.inProcess} size={'sm'} target={'info'}>
        Сохранить
      </Button>
    </div>
  );
};
