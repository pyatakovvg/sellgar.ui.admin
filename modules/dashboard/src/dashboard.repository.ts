import { Fetch } from '@library/app';

export class DashboardRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: import.meta.env.VITE_GATEWAY_API,
  });

  async getCompany() {
    return await this.fetch.send({
      url: '/company',
    });
  }
}
