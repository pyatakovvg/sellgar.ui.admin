import { inject, injectable } from 'inversify';

import { ProductService, ProductServiceSymbol } from '@library/infra';

export const UpdateProductCaseSymbol = Symbol.for('UpdateProductCase');

@injectable()
export class UpdateProductCase {
  constructor(@inject(ProductServiceSymbol) private productService: ProductService) {}

  execute(uuid: string, body: any) {
    return this.productService.update(uuid, body);
  }
}
