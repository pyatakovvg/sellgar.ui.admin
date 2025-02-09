import { HttpException, CategoryEntity, CategoryServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';
import { makeObservable, observable, action } from 'mobx';

export const FormStoreSymbol = Symbol.for('FormStore');

@injectable()
export class FormStore {
  @observable inProcess: boolean = false;
  @observable error: HttpException | null = null;

  constructor(@inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface) {
    makeObservable(this);
  }

  @action.bound
  setProcess(state: boolean) {
    this.inProcess = state;
  }

  @action.bound
  setError(error: HttpException | null) {
    this.error = error;
  }

  async update(data: CategoryEntity) {
    this.setProcess(true);

    try {
      await this.categoryService.update(data.uuid, data);
      return true;
    } catch (error) {
      this.setError(error as HttpException);
    } finally {
      this.setProcess(false);
    }
  }

  async create(data: CategoryEntity) {
    this.setProcess(true);

    try {
      await this.categoryService.create(data);
      return true;
    } catch (error) {
      this.setError(error as HttpException);
    } finally {
      this.setProcess(false);
    }
  }
}
