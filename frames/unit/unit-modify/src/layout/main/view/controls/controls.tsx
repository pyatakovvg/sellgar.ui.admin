import { Button } from '@sellgar/kit';
import * as AppRuntime from '@sellgar/app/react';

import React from 'react';

import { UnitModifyControllerInterface } from '../../../../classes/controller/unit-modify/unit-modify-controller.interface.ts';

import { UNIT_MODIFY_FORM_ID } from '../../../../constants/unit-modify.constants.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = AppRuntime.useController(UnitModifyControllerInterface);
  const data = AppRuntime.useLoaderData(UnitModifyControllerInterface);
  const submit = AppRuntime.useSubmit(UnitModifyControllerInterface);

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
        <Button type={'submit'} form={UNIT_MODIFY_FORM_ID} inProcess={submit.inProcess}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
