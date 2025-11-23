import { UnitResultEntity } from '@library/domain';

export abstract class UnitsControllerInterface {
  abstract loader(): Promise<UnitResultEntity>;
}
