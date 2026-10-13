import { Button } from '@sellgar/kit';
import { useController, useLoaderData } from '@sellgar/app/react';
import React from 'react';
import { PropertyReviewControllerInterface } from '../../../../classes/controller/property-review/property-review-controller.interface.ts';
import s from './default.module.scss';

export const Controls: React.FC = () => {
  const data = useLoaderData(PropertyReviewControllerInterface);
  const controller = useController(PropertyReviewControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'primary'} onClick={() => controller.toModify(data.code)}>
        Редактировать
      </Button>
    </div>
  );
};
