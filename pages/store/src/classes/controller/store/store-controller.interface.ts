import type { StoreProductResultEntity } from '@library/domain';
import type { ControllerInterface } from '@sellgar/app';

export abstract class StoreControllerInterface implements ControllerInterface {
  abstract loader(): Promise<StoreProductResultEntity>;
}
