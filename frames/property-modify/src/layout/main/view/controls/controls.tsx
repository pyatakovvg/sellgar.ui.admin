import { useController, useSubmit } from '@sellgar/app';
import { Button } from '@sellgar/kit';

import React from 'react';

import { PROPERTY_MODIFY_FORM_ID } from '../../../../constants/property-modify.constants.ts';

import { PropertyModifyControllerInterface } from '../../../../classes/controller/property-modify/property-modify-controller.interface.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = useController(PropertyModifyControllerInterface);

  const submit = useSubmit(PropertyModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'secondary'} disabled={submit.inProcess} onClick={() => void controller.close()}>
        Отмена
      </Button>
      <Button type={'submit'} form={PROPERTY_MODIFY_FORM_ID} inProcess={submit.inProcess}>
        Сохранить
      </Button>
    </div>
  );
};
