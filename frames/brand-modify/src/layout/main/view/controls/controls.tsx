import { Button } from '@sellgar/kit';
import * as AppRuntime from '@sellgar/app-v2/react';

import React from 'react';

import { BrandModifyControllerInterface } from '../../../../classes/controller/brand-modify/brand-modify-controller.interface.ts';

import { BRAND_MODIFY_FORM_ID } from '../../../../constants/brand-modify.constants.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = AppRuntime.useController(BrandModifyControllerInterface);
  const submit = AppRuntime.useSubmit(BrandModifyControllerInterface);

  const handleBackClick = () => {
    void controller.close();
  };

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'secondary'} disabled={submit.inProcess} onClick={handleBackClick}>
        Отмена
      </Button>
      <Button type={'submit'} form={BRAND_MODIFY_FORM_ID} inProcess={submit.inProcess}>
        Сохранить
      </Button>
    </div>
  );
};
