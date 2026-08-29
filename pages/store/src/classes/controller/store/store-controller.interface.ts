import type { StoreProductResultEntity } from '@library/domain';

export abstract class StoreControllerInterface {
  abstract loader(): Promise<StoreProductResultEntity>;
}
