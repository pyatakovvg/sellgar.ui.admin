import { useController, useSubmit } from '@tiyn/app';
import { Button } from '@sellgar/kit';
import { ArrowLeftSLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { BRAND_MODIFY_FORM_ID } from '../../../../constants';

import { BrandModifyControllerInterface } from '../../../../classes/controller/brand-modify-controller.interface.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = useController(BrandModifyControllerInterface);

  const submit = useSubmit(BrandModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button
        leadIcon={<ArrowLeftSLineIcon />}
        style={'secondary'}
        disabled={submit.inProcess}
        onClick={() => controller.toList()}
      >
        Назад
      </Button>
      <Button
        type={'submit'}
        form={BRAND_MODIFY_FORM_ID}
        inProcess={submit.inProcess}
      >
        Сохранить
      </Button>
    </div>
  );
};
