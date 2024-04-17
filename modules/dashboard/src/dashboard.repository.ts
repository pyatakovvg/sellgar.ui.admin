import { HttpClient } from '@library/infra';

export class DashboardRepository {
  private readonly fetch: HttpClient = new HttpClient();

  async getCompany() {
    return await this.fetch.send({
      url: import.meta.env.VITE_GATEWAY_API + '/company',
    });
  }
}
