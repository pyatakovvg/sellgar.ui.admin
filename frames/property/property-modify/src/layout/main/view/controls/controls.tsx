import { Button } from '@sellgar/kit';
import * as AppRuntime from '@sellgar/app/react';

import React from 'react';

import { PropertyModifyControllerInterface } from '../../../../classes/controller/property-modify/property-modify-controller.interface.ts';

import { PROPERTY_MODIFY_FORM_ID } from '../../../../constants/property-modify.constants.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = AppRuntime.useController(PropertyModifyControllerInterface);
  const data = AppRuntime.useLoaderData(PropertyModifyControllerInterface);
  const submit = AppRuntime.useSubmit(PropertyModifyControllerInterface);

  const handleBackClick = () => {
    void controller.close(data?.code);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.button}>
        <Button type={'button'} style={'secondary'} disabled={submit.inProcess} onClick={handleBackClick}>
          Отмена
        </Button>
      </div>
      <div className={s.button}>
        <Button type={'submit'} form={PROPERTY_MODIFY_FORM_ID} inProcess={submit.inProcess}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
