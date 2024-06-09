import { ProductService, ProductServiceSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

export const GetProductsCaseSymbol = Symbol.for('GetProductsCase');

@injectable()
export class GetProductsCase {
  constructor(@inject(ProductServiceSymbol) private readonly productService: ProductService) {}

  execute() {
    return this.productService.getAll();
  }
}
