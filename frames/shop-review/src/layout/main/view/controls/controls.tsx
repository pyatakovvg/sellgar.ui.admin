import { useController, useLoaderData } from '@sellgar/app/react';
import { Button } from '@sellgar/kit';

import React from 'react';

import { ShopModifyControllerInterface } from '../../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);
  const controller = useController(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'primary'} onClick={() => controller.toModify(data.uuid)}>
        Редактировать
      </Button>
    </div>
  );
};
