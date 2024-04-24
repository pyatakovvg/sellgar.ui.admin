import { injectable, inject } from 'inversify';

import { ProductGateway, ProductGatewaySymbol } from './product.gateway.ts';

export const ProductServiceSymbol = Symbol.for('ProductService');

@injectable()
export class ProductService {
  constructor(@inject(ProductGatewaySymbol) private readonly productGateway: ProductGateway) {}

  getAll() {
    return this.productGateway.getAll();
  }

  getByUuid(uuid: string) {
    return this.productGateway.getByUuid(uuid);
  }

  update(uuid: string, body: any) {
    return this.productGateway.update(uuid, body);
  }

  create(body: any) {
    return this.productGateway.create(body);
  }
}
