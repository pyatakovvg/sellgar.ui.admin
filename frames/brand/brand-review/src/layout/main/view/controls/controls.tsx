import { Button } from '@sellgar/kit';
import { useController, useLoaderData } from '@sellgar/app/react';
import React from 'react';
import { BrandReviewControllerInterface } from '../../../../classes/controller/brand-review/brand-review-controller.interface.ts';
import s from './default.module.scss';

export const Controls: React.FC = () => {
  const data = useLoaderData(BrandReviewControllerInterface);
  const controller = useController(BrandReviewControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'button'} style={'primary'} onClick={() => controller.toModify(data.code)}>
        Редактировать
      </Button>
    </div>
  );
};
