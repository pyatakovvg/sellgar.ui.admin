import { HttpException, UnitEntity, UnitServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const UnitStoreSymbol = Symbol.for('UnitStore');

@injectable()
export class UnitStore {
  @observable inProcess: boolean = true;
  @observable data: UnitEntity | null = null;
  @observable error: HttpException | null = null;

  constructor(@inject(UnitServiceInterface) private readonly unitService: UnitServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: UnitEntity | null) {
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
        const result = await this.unitService.findByUuid(uuid);

        this.setData(result);

        return result;
      }
    } catch (error) {
      this.setError(error as HttpException);
    } finally {
      this.setProcess(false);
    }
  }
}
