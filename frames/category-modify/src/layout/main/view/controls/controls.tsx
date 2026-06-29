import { Button } from '@sellgar/kit';
import { useController, useSubmit } from '@tiyn/app';

import React from 'react';

import { CategoryModifyControllerInterface } from '../../../../classes/controller/category-modify-controller.interface.ts';
import { CATEGORY_MODIFY_FORM_ID } from '../../../../constants';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const submit = useSubmit(CategoryModifyControllerInterface);
  const controller = useController(CategoryModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} disabled={submit.inProcess} size={'sm'} style={'secondary'} onClick={() => controller.toList()}>
        Отмена
      </Button>
      <Button type={'submit'} form={CATEGORY_MODIFY_FORM_ID} disabled={submit.inProcess} size={'sm'}>
        Сохранить
      </Button>
    </div>
  );
};
