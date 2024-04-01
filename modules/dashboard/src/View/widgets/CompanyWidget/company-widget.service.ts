import { CompanyWidgetRepository } from './company-widget.repository.ts';

export class CompanyWidgetService {
  private readonly companyWidgetRepository: CompanyWidgetRepository = new CompanyWidgetRepository();
  async getCompany() {
    return await this.companyWidgetRepository.getCompany();
  }
}
