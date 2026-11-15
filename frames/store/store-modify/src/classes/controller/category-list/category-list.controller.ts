import { CategoryServiceInterface } from '@library/domain';
import { Controller, Inject } from '@sellgar/app';

import { CategoryListControllerInterface } from './category-list-controller.interface.ts';
import { CategoryOptionsStoreInterface } from '../../store/category-options/category-options-store.interface.ts';

@Controller()
export class CategoryListController implements CategoryListControllerInterface {
  private generation = 0;
  private disposed = false;

  constructor(
    @Inject(CategoryServiceInterface) private readonly categories: CategoryServiceInterface,
    @Inject(CategoryOptionsStoreInterface) private readonly store: CategoryOptionsStoreInterface,
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

  async load(shopUuid: string): Promise<void> {
    if (this.disposed) return;
    const generation = ++this.generation;
    if (!shopUuid) {
      this.store.reset();
      return;
    }
    this.store.start();
    try {
      const tree = await this.categories.getTree(shopUuid);
      if (!this.disposed && generation === this.generation) this.store.complete(tree.nodes);
    } catch {
      if (!this.disposed && generation === this.generation)
        this.store.fail('Не удалось загрузить категории. Повторите попытку.');
    }
  }

  dispose(): void {
    this.disposed = true;
    this.generation++;
    this.store.reset();
  }
}
