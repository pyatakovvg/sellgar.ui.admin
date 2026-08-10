import { StoreServiceInterface, type StoreProductResultEntity } from '@library/domain';

import { Controller, Inject, LocationServiceInterface } from '@sellgar/app';

import { StoreControllerInterface } from './store-controller.interface.ts';
import { StoreProductQueryDto } from './dto/store-product-query.dto.ts';
import { StoreProductQueryMapper } from './mapper/store-product-query.mapper.ts';

@Controller()
export class StoreController implements StoreControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(LocationServiceInterface) private readonly locationService: LocationServiceInterface,
  ) {}

  loader(): Promise<StoreProductResultEntity> {
    const query = this.locationService.searchToObject(StoreProductQueryDto);

    return this.storeService.findAll(StoreProductQueryMapper.toInput(query));
  }
}
