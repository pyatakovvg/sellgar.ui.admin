import { type ControllerLoaderArgs } from '@tiyn/app';
import { StoreProductResultEntity } from '@library/domain';

export abstract class StoreControllerInterface {
  abstract loader(args: ControllerLoaderArgs): Promise<StoreProductResultEntity>;
}
