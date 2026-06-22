import { type ControllerLoaderArgs } from '@tiyn/app';
import { StoreResultEntity } from '@library/domain';

export abstract class StoreControllerInterface {
  abstract loader(args: ControllerLoaderArgs): Promise<StoreResultEntity>;
}
