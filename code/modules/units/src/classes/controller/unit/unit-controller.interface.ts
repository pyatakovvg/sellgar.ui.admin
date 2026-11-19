import type { UnitResultEntity } from '@library/domain';

export abstract class UnitControllerInterface {
  abstract loader(): Promise<UnitResultEntity>;
}
