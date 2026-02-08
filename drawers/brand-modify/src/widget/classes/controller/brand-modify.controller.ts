import { NavigateServiceInterface, LocationServiceInterface } from '@library/app';
import { BrandServiceInterface, CreateBrandDto, UpdateBrandDto } from '@library/domain';

import { inject, injectable } from 'inversify';

import { BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';

@injectable()
export class BrandModifyController implements BrandModifyControllerInterface {
  constructor(
    @inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @inject(LocationServiceInterface) private readonly locationService: LocationServiceInterface,
  ) {}

  async loader() {
    const hashParams = this.locationService.location.hashParams;

    if (!hashParams.brand.uuid) {
      return void 0;
    }

    return await this.brandService.findByUuid(hashParams.brand.uuid);
  }

  async create(brand: CreateBrandDto) {
    return await this.brandService.create(brand);
  }

  async update(uuid: string, brand: UpdateBrandDto) {
    return await this.brandService.update(uuid, brand);
  }

  async close() {
    await this.navigateService.hash({ brand: false });
  }
}
