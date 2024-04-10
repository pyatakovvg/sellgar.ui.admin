import { BrandRepository } from '../repository/brand.repository.ts';

export class BrandService {
  private readonly brandRepository: BrandRepository = new BrandRepository();

  getAll() {
    return this.brandRepository.getAll();
  }
}
