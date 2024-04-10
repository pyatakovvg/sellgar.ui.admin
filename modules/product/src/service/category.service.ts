import { CategoryRepository } from '../repository/category.repository.ts';

export class CategoryService {
  private readonly categoryRepository: CategoryRepository = new CategoryRepository();

  getAll() {
    return this.categoryRepository.getAll();
  }
}
