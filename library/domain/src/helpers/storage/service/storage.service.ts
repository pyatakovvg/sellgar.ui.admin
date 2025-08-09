import { injectable } from 'inversify';

import { StorageServiceInterface, type TStorageMap } from './storage-service.interface.ts';

@injectable()
export class StorageService<T extends TStorageMap = {}> implements StorageServiceInterface<T> {
  get<K extends keyof T>(key: K): T[K] {
    return localStorage.getItem(key as string) as T[K];
  }

  set<K extends keyof T>(key: K, data: T[K]) {
    localStorage.setItem(key as string, data);
  }

  remove<K extends keyof T>(key: K) {
    localStorage.removeItem(key as string);
  }
}
