import { injectable, inject } from 'inversify';

import { CategoryGateway, CategoryGatewaySymbol } from './category.gateway.ts';

export const CategoryServiceSymbol = Symbol.for('CategoryService');

@injectable()
export class CategoryService {
  constructor(@inject(CategoryGatewaySymbol) private categoryGateway: CategoryGateway) {}

  getAll() {
    return this.categoryGateway.getAll();
  }
}
