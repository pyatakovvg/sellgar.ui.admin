import { Button } from '@sellgar/kit';
import { useController, useSubmit } from '@sellgar/app';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../classes/controller/context';
import { AdjustInventoryControllerInterface } from '../../../../classes/controller/operation/adjust';
import { ReceiptInventoryControllerInterface } from '../../../../classes/controller/operation/receipt';
import { WriteOffInventoryControllerInterface } from '../../../../classes/controller/operation/write-off';
import { STORE_INVENTORY_FORM_ID } from '../../../../constants';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const adjustSubmit = useSubmit(AdjustInventoryControllerInterface);
  const receiptSubmit = useSubmit(ReceiptInventoryControllerInterface);
  const writeOffSubmit = useSubmit(WriteOffInventoryControllerInterface);
  const controller = useController(StoreInventoryContextControllerInterface);
  const inProcess = adjustSubmit.inProcess || receiptSubmit.inProcess || writeOffSubmit.inProcess;

  return (
    <div className={s.wrapper}>
      <Button type={'button'} disabled={inProcess} size={'sm'} style={'secondary'} onClick={() => controller.toList()}>
        Отмена
      </Button>
      <Button type={'submit'} form={STORE_INVENTORY_FORM_ID} disabled={inProcess} size={'sm'} target={'info'}>
        Сохранить
      </Button>
    </div>
  );
};
