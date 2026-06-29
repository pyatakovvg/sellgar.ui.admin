import { Button } from '@sellgar/kit';
import { useController, useSubmit } from '@tiyn/app';

import React from 'react';

import { PropertyModifyControllerInterface } from '../../../../classes/controller/property-modify-controller.interface.ts';
import { PROPERTY_MODIFY_FORM_ID } from '../../../../constants';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const submit = useSubmit(PropertyModifyControllerInterface);
  const controller = useController(PropertyModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} disabled={submit.inProcess} size={'sm'} style={'secondary'} onClick={() => controller.toList()}>
        Отмена
      </Button>
      <Button type={'submit'} form={PROPERTY_MODIFY_FORM_ID} disabled={submit.inProcess} size={'sm'} target={'info'}>
        Сохранить
      </Button>
    </div>
  );
};
