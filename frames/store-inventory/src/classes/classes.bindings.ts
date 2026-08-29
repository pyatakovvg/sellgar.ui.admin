import { BindingModuleInterface, type BindingRegistryInterface } from '@sellgar/app-v2';

import { StoreInventoryContextControllerInterface } from './controller/context/store-inventory-context-controller.interface.ts';
import { StoreInventoryContextController } from './controller/context/store-inventory-context.controller.ts';
import { AdjustInventoryControllerInterface } from './controller/operation/adjust/adjust-inventory-controller.interface.ts';
import { AdjustInventoryController } from './controller/operation/adjust/adjust-inventory.controller.ts';
import { ReceiptInventoryControllerInterface } from './controller/operation/receipt/receipt-inventory-controller.interface.ts';
import { ReceiptInventoryController } from './controller/operation/receipt/receipt-inventory.controller.ts';
import { WriteOffInventoryControllerInterface } from './controller/operation/write-off/write-off-inventory-controller.interface.ts';
import { WriteOffInventoryController } from './controller/operation/write-off/write-off-inventory.controller.ts';

export class StoreInventoryBindings implements BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(StoreInventoryContextControllerInterface).to(StoreInventoryContextController);
    registry.bind(AdjustInventoryControllerInterface).to(AdjustInventoryController);
    registry.bind(ReceiptInventoryControllerInterface).to(ReceiptInventoryController);
    registry.bind(WriteOffInventoryControllerInterface).to(WriteOffInventoryController);
  }
}
