import { CategoryServiceInterface } from '@library/domain';

import { Controller, Inject, RevalidateServiceInterface } from '@sellgar/app-v2';
import { NavigateServiceInterface } from '@sellgar/app-v2';

import { CategoryModifyControllerInterface } from './category-modify-controller.interface.ts';

@Controller()
export class CategoryModifyController implements CategoryModifyControllerInterface {
  constructor(
    @Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @Inject(NavigateServiceInterface) private readonly navigateService: NavigateServiceInterface,
    @Inject(RevalidateServiceInterface) private readonly revalidateService: RevalidateServiceInterface,
  ) {}

  async loader(args: Parameters<CategoryModifyControllerInterface['loader']>[0]) {
    if (!args.params.uuid) {
      return void 0;
    }

    return this.categoryService.findByUuid(args.params.uuid);
  }

  async action(args: Parameters<CategoryModifyControllerInterface['action']>[0]) {
    if ('uuid' in args.payload) {
      await this.categoryService.update(args.payload.uuid, args.payload);
    } else {
      await this.categoryService.create(args.payload);
    }

    await this.revalidateService.revalidate();
    await this.navigateService.close();
  }

  async close() {
    await this.navigateService.close();
  }
}
