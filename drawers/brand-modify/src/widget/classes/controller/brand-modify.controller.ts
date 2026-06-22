import { BrandServiceInterface, CreateBrandDto, UpdateBrandDto } from '@library/domain';

import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
  type FrameControllerLoaderArgs,
} from '@tiyn/app';

import { BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';
import { type BrandModifyFrameParams } from '../../../brand-modify.frame.tsx';

@Controller()
export class BrandModifyController implements BrandModifyControllerInterface {
  constructor(
    @Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<BrandModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.brandService.findByUuid(args.props.uuid);
  }

  async create(brand: CreateBrandDto) {
    await this.brandService.create(brand);

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async update(uuid: string, brand: UpdateBrandDto) {
    await this.brandService.update(uuid, brand);

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async close() {
    await this.frameService.close();
  }
}
