import { CategoryServiceInterface } from '@library/domain';

import {
  Controller,
  FrameServiceInterface,
  Inject,
  RevalidateServiceInterface,
} from '@sellgar/app';

import { CategoryModifyControllerInterface } from './category-modify-controller.interface.ts';

@Controller()
export class CategoryModifyController implements CategoryModifyControllerInterface {
  constructor(
    @Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @Inject(FrameServiceInterface) private readonly frameService: FrameServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<CategoryModifyControllerInterface['loader']>[0]) {
    if (!args.props.uuid) {
      return void 0;
    }

    return this.categoryService.findByUuid(args.props.uuid);
  }

  async action(args: Parameters<CategoryModifyControllerInterface['action']>[0]) {
    if ('uuid' in args.payload) {
      await this.categoryService.update(args.payload.uuid, args.payload);
    } else {
      await this.categoryService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.frameService.close();
  }

  async close() {
    await this.frameService.close();
  }
}
