import { HttpException, BrandEntity, BrandServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const BrandStoreSymbol = Symbol.for('BrandStore');

@injectable()
export class BrandStore {
  @observable inProcess: boolean = true;
  @observable data: BrandEntity | null = null;
  @observable error: HttpException | null = null;

  constructor(@inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setData(data: BrandEntity | null) {
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
        const result = await this.brandService.findByUuid(uuid);

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
