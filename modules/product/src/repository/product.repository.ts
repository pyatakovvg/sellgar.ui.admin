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

  updateProductByUuid(uuid: string, body: any) {
    return this.fetch.send({
      url: '/products/' + uuid,
      method: 'put',
      data: body,
    });
  }

  createProduct(body: any) {
    return this.fetch.send({
      url: '/products',
      method: 'post',
      data: body,
    });
  }
}
