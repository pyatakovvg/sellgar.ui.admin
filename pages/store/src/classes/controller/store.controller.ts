import { StoreServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { StoreControllerInterface } from './store-controller.interface.ts';

@injectable()
export class StoreController implements StoreControllerInterface {
  constructor(@inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface) {}

  async loader() {
    return await this.storeService.findAll();
  }
}
