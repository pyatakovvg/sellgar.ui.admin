import {
  HttpException,
  PropertyEntity,
  PropertyGroupEntity,
  UnitEntity,
  UnitServiceInterface,
  PropertyServiceInterface,
  PropertyGroupServiceInterface,
} from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const PropertyStoreSymbol = Symbol.for('PropertyStore');

@injectable()
export class PropertyStore {
  @observable inProcess: boolean = true;
  @observable data: PropertyEntity | null = null;
  @observable error: HttpException | null = null;
  @observable groups: PropertyGroupEntity[] = [];
  @observable units: UnitEntity[] = [];

  constructor(
    @inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface,
    @inject(PropertyServiceInterface) private readonly propertyService: PropertyServiceInterface,
    @inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {
    makeObservable(this);
  }

  @action.bound
  setData(data: PropertyEntity | null) {
    this.data = data;
  }

  @action.bound
  setGroups(groups: PropertyGroupEntity[]) {
    this.groups = groups;
  }

  @action.bound
  setUnits(units: UnitEntity[]) {
    this.units = units;
  }

  @action.bound
  setError(error: HttpException | null) {
    this.error = error;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  async findByUuid(uuid?: string) {
    this.setProcess(true);

    try {
      if (uuid) {
        const result = await this.propertyService.findByUuid(uuid);
        this.setData(result);
      }
      const units = await this.unitService.findAll();
      const groups = await this.propertyGroupService.findAll();

      this.setUnits(units.data);
      this.setGroups(groups.data);
    } catch (error) {
      this.setError(error as HttpException);
    } finally {
      this.setProcess(false);
    }
  }
}
