import type { UnitEntity } from '@library/domain';

export abstract class UnitListControllerInterface {
  abstract loader(): Promise<UnitEntity[]>;
}
