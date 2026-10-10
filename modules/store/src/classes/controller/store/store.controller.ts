import { StoreServiceInterface, type StoreProductResultEntity } from '@library/domain';

import { Controller, Inject, RouteQueryServiceInterface } from '@sellgar/app';

import { FilterQuery } from '../filter/query/filter.query.ts';
import { StoreControllerInterface } from './store-controller.interface.ts';

@Controller()
export class StoreController implements StoreControllerInterface {
  constructor(
    @Inject(StoreServiceInterface) private readonly storeService: StoreServiceInterface,
    @Inject(RouteQueryServiceInterface) private readonly query: RouteQueryServiceInterface,
  ) {}

  loader(): Promise<StoreProductResultEntity> {
    return this.storeService.findAll(this.query.get(FilterQuery));
  }
}
