import { TabMenu } from '@sellgar/kit';

import React from 'react';

import { AdjustInventoryForm } from './adjust';
import { ReceiptInventoryForm } from './receipt';
import { WriteOffInventoryForm } from './write-off';

import s from './default.module.scss';

export const InventoryOperations: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <TabMenu defaultTabName={'adjust'}>
        <TabMenu.Line size={'sm'}>
          <TabMenu.Tab name={'adjust'} title={'Коррекция'} />
          <TabMenu.Tab name={'receipt'} title={'Поступление'} />
          <TabMenu.Tab name={'writeOff'} title={'Списание'} />
        </TabMenu.Line>
        <TabMenu.Content name={'adjust'}>
          <AdjustInventoryForm />
        </TabMenu.Content>
        <TabMenu.Content name={'receipt'}>
          <ReceiptInventoryForm />
        </TabMenu.Content>
        <TabMenu.Content name={'writeOff'}>
          <WriteOffInventoryForm />
        </TabMenu.Content>
      </TabMenu>
    </div>
  );
};
