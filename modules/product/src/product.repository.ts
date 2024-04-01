import { Fetch } from '@library/app';

export class ProductRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: 'http://localhost:4020',
  });

  getProduct(uuid: string) {
    return this.fetch.send({
      url: '/products/' + uuid,
    });
  }
}
