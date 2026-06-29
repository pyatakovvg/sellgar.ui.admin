import { useController, useSubmit } from '@tiyn/app';
import { Button } from '@sellgar/kit';

import React from 'react';

import { BrandModifyControllerInterface } from '../../../../classes/controller/brand-modify-controller.interface.ts';
import { BRAND_MODIFY_FORM_ID } from '../../../../constants';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const submit = useSubmit(BrandModifyControllerInterface);
  const controller = useController(BrandModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} disabled={submit.inProcess} size={'sm'} style={'secondary'} onClick={() => controller.toList()}>
        Отмена
      </Button>
      <Button type={'submit'} form={BRAND_MODIFY_FORM_ID} disabled={submit.inProcess} size={'sm'} target={'info'}>
        Сохранить
      </Button>
    </div>
  );
};
