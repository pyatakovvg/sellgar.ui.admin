import { LoaderArgs } from '@library/app';
import { StoreResultEntity } from '@library/domain';

export abstract class StoreControllerInterface {
  abstract loader(args: LoaderArgs): Promise<StoreResultEntity>;
}
