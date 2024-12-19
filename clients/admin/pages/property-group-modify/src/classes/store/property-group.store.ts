import { HttpException, PropertyGroupEntity, PropertyGroupServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const PropertyGroupStoreSymbol = Symbol.for('PropertyGroupStore');

@injectable()
export class PropertyGroupStore {
  @observable inProcess: boolean = true;
  @observable data: PropertyGroupEntity | null = null;
  @observable error: HttpException | null = null;

  constructor(
    @inject(PropertyGroupServiceInterface) private readonly propertyGroupService: PropertyGroupServiceInterface,
  ) {
    makeObservable(this);
  }

  @action.bound
  setData(data: PropertyGroupEntity | null) {
    this.data = data;
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
        const result = await this.propertyGroupService.findByUuid(uuid);

        this.setData(result);
      }
    } catch (error) {
      this.setError(error as HttpException);
    } finally {
      this.setProcess(false);
    }
  }
}
