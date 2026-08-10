import { useController, useSubmit } from '@sellgar/app';
import { Button } from '@sellgar/kit';

import React from 'react';

import { SHOP_MODIFY_FORM_ID } from '../../../../constants/shop-modify.constants.ts';

import { ShopModifyControllerInterface } from '../../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const controller = useController(ShopModifyControllerInterface);

  const submit = useSubmit(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'secondary'} disabled={submit.inProcess} onClick={() => void controller.close()}>
        Отмена
      </Button>
      <Button type={'submit'} form={SHOP_MODIFY_FORM_ID} inProcess={submit.inProcess}>
        Сохранить
      </Button>
    </div>
  );
};
