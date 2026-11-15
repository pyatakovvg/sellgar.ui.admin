import type { CategoryNodeEntity } from '@library/domain';

export abstract class CategoryListControllerInterface {
  abstract readonly options: CategoryNodeEntity[];
  abstract readonly loading: boolean;
  abstract readonly error: string | undefined;
  abstract load(shopUuid: string): Promise<void>;
  abstract dispose(): void;
}
