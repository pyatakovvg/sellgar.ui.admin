import { inject, injectable } from 'inversify';

import { BrandService, BrandServiceSymbol } from '@library/infra';
import { CategoryService, CategoryServiceSymbol } from '@library/infra';

export const GetOptionalDataCaseSymbol = Symbol.for('GetOptionalDataCase');

@injectable()
export class GetOptionalDataCase {
  constructor(
    @inject(BrandServiceSymbol) private brandService: BrandService,
    @inject(CategoryServiceSymbol) private readonly categoryService: CategoryService,
  ) {}

  async execute() {
    return {
      brands: await this.brandService.getAll(),
      category: await this.categoryService.getAll(),
    };
  }
}
