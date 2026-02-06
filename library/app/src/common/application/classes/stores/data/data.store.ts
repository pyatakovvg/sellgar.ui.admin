import { observable, action, makeAutoObservable } from 'mobx';

import { StoreDataKeyLike, DataStoreInterface } from './data-store.interface.ts';

export class DataStore implements DataStoreInterface {
  @observable private readonly data = new Map<StoreDataKeyLike<any>, unknown>();

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  set<T>(key: StoreDataKeyLike<T>, value: T): void {
    this.data.set(key, value);
  }

  get<T>(key: StoreDataKeyLike<T>): T | undefined {
    return this.data.get(key) as T | undefined;
  }

  has(key: StoreDataKeyLike<unknown>): boolean {
    return this.data.has(key);
  }

  @action.bound
  delete(key: StoreDataKeyLike<unknown>): void {
    this.data.delete(key);
  }

  @action.bound
  clear(): void {
    this.data.clear();
  }
}
