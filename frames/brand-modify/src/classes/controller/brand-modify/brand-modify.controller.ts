import { BrandServiceInterface } from '@library/domain';

import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
} from '@sellgar/app';

import { BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';

@Controller()
export class BrandModifyController implements BrandModifyControllerInterface {
  constructor(
    @Inject(BrandServiceInterface) private readonly brandService: BrandServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<BrandModifyControllerInterface['loader']>[0]) {
    if (!args.props.uuid) {
      return void 0;
    }

    return this.brandService.findByUuid(args.props.uuid);
  }

  async action(args: Parameters<BrandModifyControllerInterface['action']>[0]) {
    if ('uuid' in args.payload) {
      await this.brandService.update(args.payload.uuid, args.payload);
    } else {
      await this.brandService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async close() {
    await this.frameService.close();
  }
}
