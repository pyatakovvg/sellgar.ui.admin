import { Fetch } from '@library/app';

export class CategoryRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: 'http://localhost:4020',
  });

  getAll() {
    return this.fetch.send({
      url: '/categories',
    });
  }
}
