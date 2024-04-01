import { DashboardRepository } from './dashboard.repository';

export class DashboardService {
  private readonly homeRepository: DashboardRepository = new DashboardRepository();
  async getCompany() {
    return await this.homeRepository.getCompany();
  }
}
