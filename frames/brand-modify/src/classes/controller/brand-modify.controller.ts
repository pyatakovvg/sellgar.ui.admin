import { BrandServiceInterface } from '@library/domain';

import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
  type FrameControllerActionArgs,
  type FrameControllerLoaderArgs,
} from '@sellgar/app';

import { BrandModifyActionPayload, BrandModifyControllerInterface } from './brand-modify-controller.interface.ts';
import { BrandModifyFrameParams } from '../params';

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

  async action(args: FrameControllerActionArgs<BrandModifyFrameParams, BrandModifyActionPayload>) {
    if ('uuid' in args.payload) {
      await this.brandService.update(args.payload.uuid, args.payload);
    } else {
      await this.brandService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async toList() {
    await this.frameService.close();
  }
}
