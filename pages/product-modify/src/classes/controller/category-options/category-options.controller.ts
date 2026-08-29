import { CategoryServiceInterface } from '@library/domain';
import { Controller, Inject } from '@sellgar/app-v2';

import { CategoryOptionsControllerInterface } from './category-options-controller.interface.ts';

@Controller()
export class CategoryOptionsController implements CategoryOptionsControllerInterface {
  constructor(@Inject(CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface) {}

  loader() {
    return this.categoryService.findAll();
  }
}
