import { injectable, inject } from 'inversify';

import { BrandGateway, BrandGatewaySymbol } from './brand.gateway.ts';

export const BrandServiceSymbol = Symbol.for('BrandService');

@injectable()
export class BrandService {
  constructor(@inject(BrandGatewaySymbol) private readonly brandGateway: BrandGateway) {}

  getAll() {
    return this.brandGateway.getAll();
  }
}
