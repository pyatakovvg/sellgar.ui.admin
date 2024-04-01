import { Fetch } from '@library/app';

import type { ICompany } from './company-widget.types.ts';

export class CompanyWidgetRepository {
  private readonly fetch: Fetch = new Fetch({
    baseURL: import.meta.env.VITE_GATEWAY_API,
  });

  async getCompany(): Promise<ICompany[]> {
    return await this.fetch.send({
      url: '/company',
    });
  }
}
