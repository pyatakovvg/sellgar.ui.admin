import { Button } from '@sellgar/kit';
import { ArrowLeftSLineIcon } from '@sellgar/kit/icons';
import * as AppRuntime from '@tiyn/app';

import React from 'react';

import { BrandModifyControllerInterface } from '../../../../classes/controller/brand-modify-controller.interface.ts';

import { BRAND_MODIFY_FORM_ID } from '../../../../constants';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = AppRuntime.useController(BrandModifyControllerInterface);
  const submit = AppRuntime.useSubmit(BrandModifyControllerInterface);

  const handleBackClick = () => {
    void controller.toList();
  };

  return (
    <div className={s.wrapper}>
      <Button
        leadIcon={<ArrowLeftSLineIcon />}
        style={'secondary'}
        disabled={submit.inProcess}
        onClick={handleBackClick}
      >
        Назад
      </Button>
      <Button type={'submit'} form={BRAND_MODIFY_FORM_ID} inProcess={submit.inProcess}>
        Сохранить
      </Button>
    </div>
  );
};
