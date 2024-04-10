import { ProductRepository } from '../repository/product.repository.ts';

export class ProductService {
  private readonly productRepository: ProductRepository = new ProductRepository();

  getByUuid(uuid: string) {
    return this.productRepository.getProduct(uuid);
  }

  updateProductByUuid(uuid: string, body: any) {
    return this.productRepository.updateProductByUuid(uuid, body);
  }

  createProduct(body: any) {
    return this.productRepository.createProduct(body);
  }
}
