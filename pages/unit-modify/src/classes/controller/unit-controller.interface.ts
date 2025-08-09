import { UnitEntity } from '@library/domain';

import { FormStoreInterface } from '../store/form/form-store.interface.ts';

export abstract class UnitControllerInterface {
  abstract readonly formStore: FormStoreInterface;

  abstract getByUuid(uuid: string): Promise<UnitEntity>;
  abstract create(entity: UnitEntity): Promise<UnitEntity>;
  abstract update(uuid: string, entity: UnitEntity): Promise<UnitEntity>;
}
