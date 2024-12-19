import { PropertyGroupEntity, MetaEntity, PropertyGroupServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const PropertyStoreSymbol = Symbol.for('PropertyStore');

@injectable()
export class PropertyStore {
  @observable inProcess: boolean = true;
  @observable data: PropertyGroupEntity[] = [];
  @observable meta: MetaEntity;

  constructor(
    @inject(PropertyGroupServiceInterface)
    private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {
    makeObservable(this);
  }

  @action.bound
  setData(data: PropertyGroupEntity[]) {
    this.data = data;
  }

  @action.bound
  setMeta(meta: MetaEntity) {
    this.meta = meta;
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  async findAll() {
    this.setProcess(true);

    try {
      const result = await this.propertyGroupService.findAll();

      this.setData(result.data);
      this.setMeta(result.meta);
    } catch (error) {
      console.log(error);
    } finally {
      this.setProcess(false);
    }
  }
}
