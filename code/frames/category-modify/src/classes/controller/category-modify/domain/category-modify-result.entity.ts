import type { CategoryEntity, CategoryNodeEntity } from '@library/domain';

export class CategoryModifyResultEntity {
  shopUuid: string;
  category: CategoryEntity | null;
  parents: CategoryNodeEntity[];
}
