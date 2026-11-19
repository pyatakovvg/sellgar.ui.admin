import type { CategoryTreeEntity, ShopEntity } from '@library/domain';

export class CategoryPageEntity {
  shops: ShopEntity[];
  tree: CategoryTreeEntity | null;
}
