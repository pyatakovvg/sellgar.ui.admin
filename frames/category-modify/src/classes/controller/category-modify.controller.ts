import { CategoryServiceInterface } from '@library/domain';

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
    if ('uuid' in args.payload) {
      await this.categoryService.update(args.payload.uuid, args.payload);
    } else {
      await this.categoryService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async toList() {
    await this.frameService.close();
  }
}
