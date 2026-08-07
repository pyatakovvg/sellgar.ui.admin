export abstract class StorageServiceInterface<T extends object = Record<never, never>> {
  abstract get<K extends keyof T>(key: K): T[K];
  abstract set<K extends keyof T>(key: K, data: T[K]): void;
  abstract remove<K extends keyof T>(key: K): void;
}
