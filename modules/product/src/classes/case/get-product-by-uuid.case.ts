import { inject, injectable } from 'inversify';

import { ProductService, ProductServiceSymbol } from '@library/infra';

export const GetProductByUuidCaseSymbol = Symbol.for('GetProductByUuidCase');

@injectable()
export class GetProductByUuidCase {
  constructor(@inject(ProductServiceSymbol) private productService: ProductService) {}

  execute(uuid: string) {
    return this.productService.getByUuid(uuid);
  }
}
