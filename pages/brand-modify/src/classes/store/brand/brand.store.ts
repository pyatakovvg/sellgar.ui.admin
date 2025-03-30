import { HttpException, BrandEntity } from '@library/domain';

import { injectable } from 'inversify';
import { ValidationError } from 'class-validator';
import { makeObservable, observable, action } from 'mobx';

import { BrandStoreInterface } from './brand-store.interface.ts';

@injectable()
export class BrandStore implements BrandStoreInterface {
  @observable data: BrandEntity | null = null;
  @observable error: HttpException | null = null;
  @observable validationErrors: ValidationError[] = [];

  constructor() {
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
  setValidationError(error: ValidationError[]) {
    this.validationErrors = error;
  }
}
