import { useController, useSubmit } from '@sellgar/app';
import { Button } from '@sellgar/kit';

import React from 'react';

import { CATEGORY_MODIFY_FORM_ID } from '../../../../constants/category-modify.constants.ts';

import { CategoryModifyControllerInterface } from '../../../../classes/controller/category-modify/category-modify-controller.interface.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = useController(CategoryModifyControllerInterface);

  const submit = useSubmit(CategoryModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'secondary'} disabled={submit.inProcess} onClick={() => void controller.close()}>
        Отмена
      </Button>
      <Button type={'submit'} form={CATEGORY_MODIFY_FORM_ID} inProcess={submit.inProcess}>
        Сохранить
      </Button>
    </div>
  );
};
