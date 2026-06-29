import { StoreProductQueryDto, StoreServiceInterface } from '@library/domain';

import { Controller, Inject, LocationServiceInterface } from '@tiyn/app';

import { StoreControllerInterface } from './store-controller.interface.ts';

@Controller()
export class StoreController implements StoreControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(LocationServiceInterface) private readonly locationService: LocationServiceInterface,
  ) {}

  async loader() {
    const query = this.locationService.searchToObject(StoreProductQueryDto);

    return await this.storeService.findAll(query);
  }
}
