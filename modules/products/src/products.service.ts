import { ProductsRepository } from './products.repository.ts';

export class ProductsService {
  private readonly homeRepository: ProductsRepository = new ProductsRepository();
  async getData(): Promise<any> {
    return await this.homeRepository.getProducts();
  }
}
