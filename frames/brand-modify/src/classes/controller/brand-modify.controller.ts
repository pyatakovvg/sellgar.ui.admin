import { BrandServiceInterface, CreateBrandInput, FileServiceInterface, UpdateBrandInput } from '@library/domain';

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
    @Inject(FileServiceInterface) private readonly fileService: FileServiceInterface,
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
    if (args.props.uuid) {
      await this.brandService.update(args.props.uuid, args.payload as UpdateBrandInput);
    } else {
      await this.brandService.create(args.payload as CreateBrandInput);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  getFileImageUrl(fileUuid: string) {
    return this.fileService.getPublicImageUrl(fileUuid);
  }

  async toList() {
    await this.frameService.close();
  }
}
