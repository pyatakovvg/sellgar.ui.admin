import {
  CategoryServiceInterface,
  CreateCategoryInput,
  FileServiceInterface,
  UpdateCategoryInput,
} from '@library/domain';

import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
  type FrameControllerActionArgs,
  type FrameControllerLoaderArgs,
} from '@sellgar/app';

import {
  CategoryModifyActionPayload,
  CategoryModifyControllerInterface,
} from './category-modify-controller.interface.ts';
import { CategoryModifyFrameParams } from '../params';

@Controller()
export class CategoryModifyController implements CategoryModifyControllerInterface {
  constructor(
    @Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @Inject(FileServiceInterface) private readonly fileService: FileServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: FrameControllerLoaderArgs<CategoryModifyFrameParams>) {
    if (!args.props.uuid) {
      return void 0;
    }

    return await this.categoryService.findByUuid(args.props.uuid);
  }

  async action(args: FrameControllerActionArgs<CategoryModifyFrameParams, CategoryModifyActionPayload>) {
    if (args.props.uuid) {
      await this.categoryService.update(args.props.uuid, args.payload as UpdateCategoryInput);
    } else {
      await this.categoryService.create(args.payload as CreateCategoryInput);
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
