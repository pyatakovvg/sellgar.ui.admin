import { BrandServiceInterface } from '@library/domain';

import { inject, injectable } from 'inversify';

import { BrandStoreInterface } from '../store/brand-store.interface.ts';
import { BrandsControllerInterface } from './brand-controller.interface.ts';

@injectable()
export class BrandController implements BrandsControllerInterface {
  constructor(
    @inject(BrandStoreInterface) private readonly brandStore: BrandStoreInterface,
    @inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
  ) {}

  getData() {
    return this.brandStore.data;
  }

  getMeta() {
    return this.brandStore.meta;
  }

  async findAll() {
    const result = await this.brandService.findAll();

    this.brandStore.setData(result.data);
    this.brandStore.setMeta(result.meta);

    return result.data;
  }
}
