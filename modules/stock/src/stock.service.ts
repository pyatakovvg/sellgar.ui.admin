import { StockRepository } from './stock.repository';

export class StockService {
  private readonly homeRepository: StockRepository = new StockRepository();
  async getData(): Promise<any[]> {
    return await this.homeRepository.getUsers();
  }
}
