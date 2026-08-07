import { Injectable } from '@sellgar/app';

import { StorageServiceInterface } from './storage-service.interface.ts';

@Injectable()
export class StorageService<T extends object = Record<never, never>> implements StorageServiceInterface<T> {
  get<K extends keyof T>(key: K): T[K] {
    return localStorage.getItem(key as string) as T[K];
  }

  set<K extends keyof T>(key: K, data: T[K]) {
    localStorage.setItem(key as string, String(data));
  }

  remove<K extends keyof T>(key: K) {
    localStorage.removeItem(key as string);
  }
}
