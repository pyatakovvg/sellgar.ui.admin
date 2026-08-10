import type { UnitResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class UnitControllerInterface implements ControllerInterface {
  abstract loader(): Promise<UnitResultEntity>;
}
