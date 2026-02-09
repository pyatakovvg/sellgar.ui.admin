import {
  NavigateServiceInterface,
  LocationServiceInterface,
  RevalidateServiceInterface,
  WidgetRevalidateServiceInterface,
} from '@library/app';
import { BrandServiceInterface, CreateBrandDto, UpdateBrandDto } from '@library/domain';

import { inject, injectable } from 'inversify';

import { BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';

@injectable()
export class BrandModifyController implements BrandModifyControllerInterface {
  constructor(
    @inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @inject(LocationServiceInterface) private readonly locationService: LocationServiceInterface,
    @inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
    @inject(WidgetRevalidateServiceInterface)
    private readonly widgetRevalidateService: WidgetRevalidateServiceInterface,
  ) {}

  async loader() {
    const hashParams = this.locationService.location.hashParams;

    if (!hashParams.brand.uuid) {
      return void 0;
    }

    return await this.brandService.findByUuid(hashParams.brand.uuid);
  }

  async create(brand: CreateBrandDto) {
    await this.brandService.create(brand);

    await this.revalidateService.revalidate();
    await this.navigateService.hash({ brand: false });
  }

  async update(uuid: string, brand: UpdateBrandDto) {
    await this.brandService.update(uuid, brand);

    await this.revalidateService.revalidate();
    await this.navigateService.hash({ brand: false });
  }

  async close() {
    await this.navigateService.hash({ brand: false });
  }

  refresh() {
    this.widgetRevalidateService.revalidate(BrandModifyControllerInterface);
  }
}
