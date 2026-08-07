import { StoreServiceInterface } from '@library/domain';

import { Controller, Inject, LocationServiceInterface } from '@sellgar/app';

import { StoreControllerInterface } from './store-controller.interface.ts';
import { StoreProductQueryDto } from './dto/store-product-query.dto.ts';

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
