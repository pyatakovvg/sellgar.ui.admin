import { BindingModuleInterface, type BindingRegistryInterface } from '@tiyn/app';

import { StoreInventoryContextController, StoreInventoryContextControllerInterface } from './controller/context';
import { AdjustInventoryController, AdjustInventoryControllerInterface } from './controller/operation/adjust';
import { ReceiptInventoryController, ReceiptInventoryControllerInterface } from './controller/operation/receipt';
import { WriteOffInventoryController, WriteOffInventoryControllerInterface } from './controller/operation/write-off';

export class StoreInventoryBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(StoreInventoryContextControllerInterface).to(StoreInventoryContextController);
    registry.bind(AdjustInventoryControllerInterface).to(AdjustInventoryController);
    registry.bind(ReceiptInventoryControllerInterface).to(ReceiptInventoryController);
    registry.bind(WriteOffInventoryControllerInterface).to(WriteOffInventoryController);
  }
}
