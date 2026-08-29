import { Button } from '@sellgar/kit';
import { useController, useSubmit } from '@sellgar/app-v2/react';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../classes/controller/context/store-inventory-context-controller.interface.ts';
import { AdjustInventoryControllerInterface } from '../../../../classes/controller/operation/adjust/adjust-inventory-controller.interface.ts';
import { ReceiptInventoryControllerInterface } from '../../../../classes/controller/operation/receipt/receipt-inventory-controller.interface.ts';
import { WriteOffInventoryControllerInterface } from '../../../../classes/controller/operation/write-off/write-off-inventory-controller.interface.ts';
import { STORE_INVENTORY_FORM_ID } from '../../../../constants/store-inventory.constants.ts';

import s from './default.module.scss';

export const Controls: React.FC = () => {
  const adjustSubmit = useSubmit(AdjustInventoryControllerInterface);
  const receiptSubmit = useSubmit(ReceiptInventoryControllerInterface);
  const writeOffSubmit = useSubmit(WriteOffInventoryControllerInterface);
  const controller = useController(StoreInventoryContextControllerInterface);
  const inProcess = adjustSubmit.inProcess || receiptSubmit.inProcess || writeOffSubmit.inProcess;

  return (
    <div className={s.wrapper}>
      <Button
        type={'button'}
        disabled={inProcess}
        size={'sm'}
        style={'secondary'}
        onClick={() => void controller.close()}
      >
        Отмена
      </Button>
      <Button type={'submit'} form={STORE_INVENTORY_FORM_ID} disabled={inProcess} size={'sm'} target={'info'}>
        Сохранить
      </Button>
    </div>
  );
};
