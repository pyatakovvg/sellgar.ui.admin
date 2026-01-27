import { StoreServiceInterface } from '@library/domain';
import { LoaderArgs } from '@library/app';

import { inject, injectable } from 'inversify';

import { StoreControllerInterface } from './store-controller.interface.ts';

@injectable()
export class StoreController implements StoreControllerInterface {
  constructor(@inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface) {}

  async loader(args: LoaderArgs) {
    const url = new URL(args.request.url);
    const searchParams = url.searchParams;

    return await this.storeService.findAll(Object.fromEntries(searchParams.entries()));
  }
}
