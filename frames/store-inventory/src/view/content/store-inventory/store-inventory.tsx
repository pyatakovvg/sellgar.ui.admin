import React from 'react';

import { InventoryContext } from './context';
import { InventoryOperations } from './operations';

import s from './default.module.scss';

export const StoreInventory: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <InventoryContext />
      <InventoryOperations />
    </div>
  );
};
