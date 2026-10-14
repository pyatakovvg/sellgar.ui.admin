import { Button } from '@sellgar/kit';
import { useController, useLoaderData } from '@sellgar/app/react';
import React from 'react';
import { StoreReviewControllerInterface } from '../../../../classes/controller/store-review/store-review-controller.interface.ts';
import s from './default.module.scss';

export const Controls: React.FC = () => {
  const data = useLoaderData(StoreReviewControllerInterface);
  const controller = useController(StoreReviewControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'primary'} onClick={() => controller.toModify(data.uuid)}>
        Редактировать
      </Button>
    </div>
  );
};
