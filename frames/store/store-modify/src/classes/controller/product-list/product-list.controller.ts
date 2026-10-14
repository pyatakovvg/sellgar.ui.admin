import { ProductServiceInterface } from '@library/domain';
import { Controller, Inject } from '@sellgar/app';

import { ProductListControllerInterface } from './product-list-controller.interface.ts';
import { ProductSearchStoreInterface } from '../../store/product-search/product-search-store.interface.ts';
@Controller()
export class ProductListController implements ProductListControllerInterface {
  private generation = 0;
  private disposed = false;

  constructor(
    @Inject(ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @Inject(ProductSearchStoreInterface) private readonly store: ProductSearchStoreInterface,
  ) {}

  get options() {
    return this.store.options;
  }
  get loading() {
    return this.store.loading;
  }
  get error() {
    return this.store.error;
  }

  async search(term: string): Promise<void> {
    if (this.disposed) return;
    const generation = ++this.generation;
    const query = term.trim();

    if (!query) {
      this.store.reset();
      return;
    }

    this.store.start();

    try {
      const result = await this.productService.findAll({ term: query, limit: 20, offset: 0 });

      if (generation === this.generation) this.store.complete(result.items);
    } catch {
      if (generation === this.generation) this.store.fail('Не удалось загрузить товары. Повторите поиск.');
    }
  }

  dispose(): void {
    this.disposed = true;
    this.generation++;
    this.store.reset();
  }
}
