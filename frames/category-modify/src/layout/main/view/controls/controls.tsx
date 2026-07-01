import { useController, useSubmit } from '@tiyn/app';
import { Button } from '@sellgar/kit';
import { ArrowLeftSLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { CATEGORY_MODIFY_FORM_ID } from '../../../../constants';

import { CategoryModifyControllerInterface } from '../../../../classes/controller/category-modify-controller.interface.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = useController(CategoryModifyControllerInterface);

  const submit = useSubmit(CategoryModifyControllerInterface);

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
        form={CATEGORY_MODIFY_FORM_ID}
        inProcess={submit.inProcess}
      >
        Сохранить
      </Button>
    </div>
  );
};
