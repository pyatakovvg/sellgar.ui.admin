import { HttpClient, HttpClientSymbol } from '@library/domain';

import { inject, injectable } from 'inversify';

export const ShopGatewaySymbol = Symbol.for('ShopGateway');

@injectable()
export class ShopGateway {
  constructor(@inject(HttpClientSymbol) private readonly httpClient: HttpClient) {}

  async getProducts(): Promise<any[]> {
    return await this.httpClient.get(import.meta.env.VITE_GATEWAY_API + '/products');
  }
}
