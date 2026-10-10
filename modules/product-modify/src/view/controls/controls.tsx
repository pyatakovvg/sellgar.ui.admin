import * as App from '@sellgar/app/react';
import { Button } from '@sellgar/kit';

import React from 'react';

import { ProductControllerInterface } from '../../classes/controller/product/product-controller.interface.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const submit = App.useSubmit(ProductControllerInterface);

  return (
    <div className={s.wrapper}>
      <Button type={'submit'} disabled={submit.inProcess} inProcess={submit.inProcess}>
        Сохранить
      </Button>
    </div>
  );
};
