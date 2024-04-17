import { inject, injectable } from 'inversify';

import { ProductService, ProductServiceSymbol } from '@library/infra';

export const CreateProductCaseSymbol = Symbol.for('CreateProductCase');

@injectable()
export class CreateProductCase {
  constructor(@inject(ProductServiceSymbol) private productService: ProductService) {}

  execute(body: any) {
    return this.productService.create(body);
  }
}
