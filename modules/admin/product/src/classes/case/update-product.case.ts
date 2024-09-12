import { inject, injectable } from 'inversify';

import { ProductService, ProductServiceSymbol } from '@library/domain';

export const UpdateProductCaseSymbol = Symbol.for('UpdateProductCase');

@injectable()
export class UpdateProductCase {
  constructor(@inject(ProductServiceSymbol) private productService: ProductService) {}

  execute(uuid: string, body: any) {
    return this.productService.update(uuid, body);
  }
}
