import { Button } from '@sellgar/kit';
import { useController, useLoaderData } from '@sellgar/app/react';
import React from 'react';
import { UnitReviewControllerInterface } from '../../../../classes/controller/unit-review/unit-review-controller.interface.ts';
import s from './default.module.scss';

export const Controls: React.FC = () => {
  const data = useLoaderData(UnitReviewControllerInterface);
  const controller = useController(UnitReviewControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'primary'} onClick={() => controller.toModify(data.code)}>
        Редактировать
      </Button>
    </div>
  );
};
