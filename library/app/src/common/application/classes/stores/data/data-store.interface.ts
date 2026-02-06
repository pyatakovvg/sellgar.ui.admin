export type StoreDataKey<T> = symbol & { __type?: T };
export type StoreDataClass<T> = abstract new (...args: any[]) => T;
export type StoreDataKeyLike<T> = StoreDataKey<T> | StoreDataClass<T>;

export const createStoreDataKey = <T>(description?: string): StoreDataKey<T> => {
  return Symbol(description) as StoreDataKey<T>;
};

export abstract class DataStoreInterface {
  abstract set<T>(key: StoreDataKeyLike<T>, value: T): void;
  abstract get<T>(key: StoreDataKeyLike<T>): T | undefined;
  abstract has(key: StoreDataKeyLike<unknown>): boolean;
  abstract delete(key: StoreDataKeyLike<unknown>): void;
  abstract clear(): void;
}
