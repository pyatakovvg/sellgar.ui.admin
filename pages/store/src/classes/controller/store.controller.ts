import { StoreServiceInterface } from '@library/domain';
import { LocationServiceInterface } from '@library/app';

import { inject, injectable } from 'inversify';

import { StoreControllerInterface } from './store-controller.interface.ts';

@injectable()
export class StoreController implements StoreControllerInterface {
  constructor(
    @inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @inject(LocationServiceInterface) private readonly locationService: LocationServiceInterface,
  ) {}

  async loader() {
    const searchParams = this.locationService.location.searchParams;
    console.log(123, searchParams);
    return await this.storeService.findAll(searchParams);
  }
}
