import { ProductRepository } from './product.repository.ts';

export class ProductService {
  private readonly productRepository: ProductRepository = new ProductRepository();

  getData(uuid: string) {
    return this.productRepository.getProduct(uuid);
  }
}
