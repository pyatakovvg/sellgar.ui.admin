import { Fetch } from '@library/app';

export class ProductsRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: import.meta.env.VITE_GATEWAY_API,
  });

  async getProducts(): Promise<any[]> {
    return await this.fetch.send({
      url: '/products',
    });
  }
}
