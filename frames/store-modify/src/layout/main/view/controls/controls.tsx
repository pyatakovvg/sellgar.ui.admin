import { useController, useSubmit } from '@sellgar/app';
import { Button } from '@sellgar/kit';

import React from 'react';

import { STORE_MODIFY_FORM_ID } from '../../../../constants/store-modify.constants.ts';

import { StoreModifyControllerInterface } from '../../../../classes/controller/store-modify/store-modify-controller.interface.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = useController(StoreModifyControllerInterface);

  const submit = useSubmit(StoreModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'secondary'} disabled={submit.inProcess} onClick={() => void controller.close()}>
        Отмена
      </Button>
      <Button type={'submit'} form={STORE_MODIFY_FORM_ID} inProcess={submit.inProcess}>
        Сохранить
      </Button>
    </div>
  );
};
