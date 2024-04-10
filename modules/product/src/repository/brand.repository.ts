import { Fetch } from '@library/app';

export class BrandRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: 'http://localhost:4020',
  });

  getAll() {
    return this.fetch.send({
      url: '/brands',
    });
  }
}
