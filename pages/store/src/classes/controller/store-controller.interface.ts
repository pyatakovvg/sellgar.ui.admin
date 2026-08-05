import { type ControllerLoaderArgs } from '@sellgar/app';
import { StoreProductResultEntity } from '@library/domain';

export abstract class StoreControllerInterface {
  abstract loader(args: ControllerLoaderArgs): Promise<StoreProductResultEntity>;
}
