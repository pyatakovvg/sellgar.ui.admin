import { UnitEntity, PropertyGroupEntity } from '@library/domain';

export abstract class FormStoreInterface {
  abstract units: UnitEntity[];
  abstract groups: PropertyGroupEntity[];

  abstract setUnits(data: UnitEntity[]): void;
  abstract setGroups(data: PropertyGroupEntity[]): void;
}
