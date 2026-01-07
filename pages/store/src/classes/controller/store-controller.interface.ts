import { StoreResultEntity } from '@library/domain';

export abstract class StoreControllerInterface {
  abstract loader(): Promise<StoreResultEntity>;
}
